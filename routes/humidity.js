const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { humidityData } = new PrismaClient()

router.get("/", async (req, res) => {
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
    }); 

    res.json(humidity)
})

module.exports = router