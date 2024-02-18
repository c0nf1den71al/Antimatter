// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const settingSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        unique: true,
        required: [true, "A setting name is required"]
    },
    value: {
        type: Schema.Types.Mixed,
        required: [true, "A setting value is required"]
    }
});


module.exports = mongoose.model("settings", settingSchema);