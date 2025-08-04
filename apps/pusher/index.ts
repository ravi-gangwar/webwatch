import { createClient } from "redis";

const redisClient = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

// we can also give url
// const client = await createClient({ 
//   url: process.env.REDIS_URL,
// }).on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

export default redisClient;