import prismaClient from "db";

async function bulkRead() {
    const websites = await prismaClient.websites.findMany();
    return websites;
}

export default bulkRead;