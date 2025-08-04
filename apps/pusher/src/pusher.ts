import redisClient from "../index";
import prismaClient from "db";


const pushWebsitesToRedis = async () => {
  try {
    const websites = await prismaClient.websites.findMany({
      select: {
        id: true,
        url: true,
      },
    });
    for (const website of websites) {
        await redisClient.xAdd("websites", "*", { id: website.id, url: website.url });
    }

} catch (error) {
    console.log(error);
  }
};

export default pushWebsitesToRedis;