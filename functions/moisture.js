const { PrismaClient } = require("@prisma/client")

const {moistureData} = new PrismaClient();

exports.handler = async (event, context, callback) => {
    const headers = {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type, Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };
    try {
        const moisture = await moistureData.findMany({
            select: {
                moisture: true,
                published: true,
                deviceID: true
            },
            where: {
                moisture: {
                    not: "0",
                },
            },
            orderBy: {
                published: 'desc'
            }
        })
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(moisture)
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error)
        }
    }
}