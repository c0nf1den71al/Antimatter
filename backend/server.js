const express = require("express");
const cors = require("cors")
const app = express();


const database = require("./lib/mongoose");
const mongoSeed = require("./lib/mongo-seed")
const { stripTrailingSlash, createLog } = require("./lib/utils")

// Initial config
app.use(cors({
    origin: stripTrailingSlash(process.env.ANTIMATTER_URL)
}))
app.use(express.json());
mongoSeed()

// Import and use routes
const routes = require("./routes")
app.use("/api", routes)

const port = process.env.ANTIMATTER_API_PORT || 4201
app.listen(port, () => {
    createLog("info", `Antimatter API listening on port ${port}`)
    console.log("Server Listening on port:", port);
});