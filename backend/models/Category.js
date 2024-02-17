// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, "A category name is required"]
    }
});


module.exports = mongoose.model("categories", categorySchema);