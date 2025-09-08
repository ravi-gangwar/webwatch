import redisClient from "@webwatch/redis-client";
import dotenv from "dotenv";
import check from "./check";
dotenv.config();

const pingAndAck = async (website: string, messageId: string, websiteId: string) => {
    try {   
        if (!website) {
            console.log("Website URL is undefined");
            return;
        }
        const response = await check(website);

        if(response.status === "success") {
            const client = await redisClient();
            // also add in radis for pushing in to the database
            await client.xAdd("results", "*", { url: website, status: response.status, responseTime: `${response.responseTime}`, responseCode: `${response.responseCode}` });
            await client.xAck("websites", process.env.CONSUMER_GROUP_NAME || "consumer-group:undefined", messageId)
        }
    } catch (error) {
        console.log(error);
    }
}

export default pingAndAck;