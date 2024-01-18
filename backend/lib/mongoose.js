const mongoose = require("mongoose");

mongoose.connect(process.env.ANTIMATTER_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", console.error.bind(console, "connection error:"));
database.once("open", function () {
    console.log("Connected to MongoDB");
});

module.exports = database;