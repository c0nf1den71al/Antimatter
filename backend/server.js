const express = require("express");
const app = express();
const database = require("./lib/mongoose");
const mongoSeed = require("./lib/mongo-seed")

// Initial config
app.use(express.json());
mongoSeed()

// Import and use routes
const routes = require("./routes")
app.use("/api", routes)

const port = process.env.ANTIMATTER_API_PORT || 4201
app.listen(port, () => {
    console.log("Server Listening on port:", port);
});