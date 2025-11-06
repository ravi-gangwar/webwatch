import dotenv from "dotenv";
import redisClient from "@webwatch/redis-client";
import cassandraClient from "cassandra"; // ✅ adjust path

dotenv.config();

let lastProcessedId = "0-0";

const bulkUpdate = async () => {
  try {
    const client = await redisClient();

    const data = await client.xRead(
      [{ key: "results", id: lastProcessedId }],
      { COUNT: 100, BLOCK: 500 }
    );

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("No new results to process");
      return;
    }

    const batch: any[] = [];
    let latestId = lastProcessedId;
    const idsToDelete: string[] = [];

    for (const stream of data as any[]) {
      for (const msg of stream.messages) {
        batch.push(msg.message);
        latestId = msg.id;
        idsToDelete.push(msg.id);
      }
    }

    if (batch.length === 0) {
      console.log("No messages in batch");
      return;
    }

    console.log(`⚙️ Bulk processing ${batch.length} logs...`);

    const dataToInsert: Array<{
      url: string;
      status: "SUCCESS" | "FAILED";
      responseTime: number;
      responseCode: number;
      consumerGroup: string;
      consumerName: string;
    }> = [];

    for (const result of batch) {
      const url = result.url as string;
      if (!url) continue;

      dataToInsert.push({
        url,
        status: result.status === "success" ? "SUCCESS" : "FAILED",
        responseTime: Number(result.responseTime) || 0,
        responseCode: Number(result.responseCode) || 0,
        consumerGroup: process.env.CONSUMER_GROUP_NAME || "default-group",
        consumerName: process.env.CONSUMER_NAME || "default-consumer",
      });
    }

    if (dataToInsert.length) {
      const queries = dataToInsert.map((d) => ({
        query: `
          INSERT INTO ticks (
            id, url, status, responseTime, responseCode,
            consumerGroup, consumerName, createdAt
          )
          VALUES (uuid(), ?, ?, ?, ?, ?, ?, toTimestamp(now()))
        `,
        params: [
          d.url,
          d.status,
          d.responseTime,
          d.responseCode,
          d.consumerGroup,
          d.consumerName,
        ],
      }));

      await cassandraClient.batch(queries, { prepare: true });
      console.log(`✅ Inserted ${dataToInsert.length} tick logs`);
    }

    if (idsToDelete.length) {
      for (const id of idsToDelete) {
        await client.xDel("results", id);
      }
    }

    lastProcessedId = latestId;
    console.log(`✅ Processed ${batch.length} logs, last ID: ${lastProcessedId}`);
  } catch (error) {
    console.error("❌ Error in bulk update:", error);
  }
};

export default bulkUpdate;
