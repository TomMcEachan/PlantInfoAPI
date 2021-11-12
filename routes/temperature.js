const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { temperatureData } = new PrismaClient()

router.get("/", async (req, res) => {
    const temperature = await temperatureData.findMany({
        select: {
            temperature: true,
            published: true,
            deviceID: true
        },
        where: {
            temperature: {
                not: "0",
            },
        },
        orderBy: {
            published: 'desc'
        }
    }); 

    res.json(temperature)
})

module.exports = router