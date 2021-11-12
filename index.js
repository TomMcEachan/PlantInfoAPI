const express = require("express");
const app = express();

app.use(express.json())

app.use('/api/moisture', require("./routes/moisture"))
app.use('/api/temperature', require("./routes/temperature"))
app.use("/api/humidity", require("./routes/humidity"))


app.listen(5000, () => {
    console.log("Listening on port 5000")
})

