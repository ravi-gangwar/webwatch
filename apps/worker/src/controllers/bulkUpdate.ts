import redisClient from "@webwatch/redis-client";
import prismaClient from "db";
import dotenv from "dotenv";

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

        console.log(`Bulk processing ${batch.length} logs`);

        const dataToInsert: Array<{ websiteId: string; status: "SUCCESS" | "FAILED"; responseTime: number; responseCode: number; consumerGroup: string; consumerName: string; }> = [];
        for (const result of batch) {
            const url = result.url as string;
            const website = await prismaClient.websites.findFirst({ where: { url } });
            if (!website) continue;
            dataToInsert.push({
                websiteId: website.id,
                status: result.status === "success" ? "SUCCESS" : "FAILED",
                responseTime: Number(result.responseTime) || 0,
                responseCode: Number(result.responseCode) || 0,
                consumerGroup: process.env.CONSUMER_GROUP_NAME || "default-group",
                consumerName: process.env.CONSUMER_NAME || "default-consumer",
            });
        }

        if (dataToInsert.length) {
            await prismaClient.ticks.createMany({ data: dataToInsert });
        }

        // Delete processed messages
        if (idsToDelete.length) {
            for (const id of idsToDelete) {
                await client.xDel("results", id);
            }
        }

        // Update last processed ID
        lastProcessedId = latestId;
        console.log(`Inserted & deleted ${batch.length} logs, last ID: ${lastProcessedId}`);

    } catch (error) {
        console.error("Error in bulk update:", error);
    }
};

export default bulkUpdate;
