// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const logSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["info", "warning", "error"],
        default: "info"
    },
    message: {
        type: String,
        required: [true, "A log message is required"]
    }
});


module.exports = mongoose.model("logs", logSchema);