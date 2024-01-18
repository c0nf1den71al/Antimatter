// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const vulnerabilitySchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    impact: {
        type: String,
        required: false
    },
    remediation: {
        type: String,
        required: false
    },
    references: {
        type: String,
        required: false
    },
    severity: {
        type: String,
        enum: ["informational", "low", "medium", "high", "critical"],
        default: "informational"
    },
    status: {
        type: String,
        enum: ["unaddressed", "remediated", "partially-remediated", "risk-accepted"],
        default: "unaddressed"
    }
});


module.exports = mongoose.model("vulnerabilities", vulnerabilitySchema);