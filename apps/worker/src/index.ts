import bulkUpdate from "./controllers/bulkUpdate";

function main() {
    try {
        setInterval(bulkUpdate, 3 * 60 * 1000);
        console.log("Worker started");
    } catch (error) {
        console.log(error);
    }
}

main();