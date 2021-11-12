const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { userData } = new PrismaClient()

router.get("/", async (req, res) => {
    const users = await userData.findMany({
        select: {
            userID: true,
            userName: true,
            password: true
        },
    }); 

    res.json(users)
})

module.exports = router