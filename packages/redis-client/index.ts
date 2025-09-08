import { createClient } from "redis";

const redisClient = async () => {
    try {
        const client = createClient();
        client.on("error", (err: any) => console.log("Redis Client Error", err));
        await client.connect();
        return client;
    } catch (error) {
        console.log("Redis Client Error", error);
        throw error;
    }
}

export default redisClient;