import dotenv from "dotenv";
import pusher from "./controller/pusher";
dotenv.config();

async function main() {
    try {
        setInterval(async () => {
            await pusher();
        }, 3 * 1000); // every 3 seconds
    } catch (error) {
        console.log(error);
    }
}

main();
