// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const engagementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    engagementCode: {
        type: String,
        required: [true, "engagementCode is required"],
        unique: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: [true, "Engagement client is required"]
    },
    consultants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }],
    template: {
        type: Schema.Types.ObjectId,
        ref: "Template",
        // required: [true, "Engagement tempate is required"]
    },
    scope: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["scoping", "in-progress", "delayed", "done", "pending"],
        default: "pending"
    },
    findings: [{
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
        evidence: {
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

    }]
});


module.exports = mongoose.model("engagements", engagementSchema);