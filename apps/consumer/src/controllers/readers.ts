import redisClient from "@webwatch/redis-client";
import dotenv from "dotenv";
import pingAndAck from "./pingAndAck";
dotenv.config();

async function reader() {
    const client = await redisClient();
    const streamKey = "websites";
    const groupName = process.env.CONSUMER_GROUP_NAME || "";
    const consumerName = process.env.CONSUMER_NAME || "";

    const stream = await client.xReadGroup(
        groupName,
        consumerName,
        [{ key: streamKey, id: ">" }],
        { COUNT: 10, BLOCK: 5000 }
    );
    console.log(JSON.stringify(stream, null, 2));
    
    if (stream && Array.isArray(stream) && stream[0] && typeof stream[0] === 'object' && stream[0] !== null && 'messages' in stream[0]) {
        (stream[0] as any).messages.forEach(async (message: any) => {
            console.log("Processing message:", message);
            await pingAndAck(message.message.websiteUrl, message.id);
        });
    }
    return stream;
}

export default reader;