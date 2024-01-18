// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const clientSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    longName: {
        type: String,
        required: [true, "Client longName is required"]
    },
    shortName: {
        type: String,
        required: false
    },
    contact: {
        fullName: {
            type: String,
            required: [true, "Contact fullName is required"]
        },
        title: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: [true, "Contact email is required"]
        },
        phone: {
            type: String,
            required: false
        }

    }
});


module.exports = mongoose.model("clients", clientSchema);