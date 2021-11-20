const { PrismaClient } = require("@prisma/client")

const {temperatureData} = new PrismaClient();

exports.handler = async (event, context, callback) => {
    const headers = {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type, Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };
    try {
        const temperature = await temperatureData.findMany({
            take: 10,
            select: {
                temperature: true,
                published: true,
                deviceID: true
            },
            where: {
                temperature: {
                    not: "0.0",
                },
            },
            orderBy: {
                published: 'desc'
            },
        })
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(temperature)
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