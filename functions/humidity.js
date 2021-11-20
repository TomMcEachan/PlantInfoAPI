const { PrismaClient } = require("@prisma/client")

const {humidityData} = new PrismaClient();

exports.handler = async (event, context, callback) => {
    const headers = {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };
    try {
        const humidity = await humidityData.findMany({
            select: {
                humidity: true,
                published: true,
                deviceID: true
            },
            where: {
                humidity: {
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
            body: JSON.stringify(humidity)
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