const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { moistureData } = new PrismaClient()

router.get("/", async (req, res) => {
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
    }); 

    res.json(moisture)
})

module.exports = router