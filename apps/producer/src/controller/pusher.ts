import redisClient from "@webwatch/redis-client";
import bulkRead from "./bulkRead";
import dotenv from "dotenv";
dotenv.config();

async function pusher() {           
    try {
        const client = await redisClient();
        const websites = await bulkRead();

        console.log("Pushing", websites.length, "websites");

        websites.forEach((website) => {
            client.XADD("websites", "*", {
                websiteUrl: website.url,
                websiteId: website.id
            });
        });     

    } catch (error) {
        console.log(error);
    }
}

export default pusher;