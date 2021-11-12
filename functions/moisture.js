const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

exports.handler = async (event, context, callback) => {
    try {
        const moisture = await prisma.post.findMany({
            select: {
                moisture: true,
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
            body: JSON.stringify(moisture)
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