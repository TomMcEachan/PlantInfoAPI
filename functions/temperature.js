const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

exports.handler = async (event, context, callback) => {
    try {
        const temperature = await prisma.post.findMany({
            select: {
                temperature: true,
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
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(temperature)
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            headers: {'Content-Type' : 'application.json'},
            body: JSON.stringify(error)
        }
    }
}