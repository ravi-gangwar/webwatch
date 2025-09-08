import reader from "./controllers/readers";
import dotenv from "dotenv";
import redisClient from "@webwatch/redis-client";
dotenv.config();

async function main() {
    try {
        const client = await redisClient();
        await client.xGroupCreate(
          "websites",
          process.env.CONSUMER_GROUP_NAME || "consumer-group:undefined",
          "0-0",
          { MKSTREAM: true }
        );
      } catch (err: any) {
        if (err.message.includes("BUSYGROUP")) {
          console.log("Consumer group already exists, skipping creation.");
        } else {
          throw err;
        }
      }
      
    try {
        setInterval(async () => {
            try {
                await reader();
            } catch (error) {
                console.log(error);
            }
        }, 3 * 1000); // every 3 seconds
    } catch (error) {
        console.log(error);
    }
}

main();