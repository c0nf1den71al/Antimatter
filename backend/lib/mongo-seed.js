const Setting = require("../models/Setting")
const User = require("../models/User")

async function mongoSeed(){
    // Init user
    try {
        // Grab credentials from environment vars
        const email = process.env.ANTIMATTER_ADMIN_EMAIL || "admin@antimatter.local"
        const password = process.env.ANTIMATTER_ADMIN_PASSWORD || "antimatter"

        // Check if any users exist
        const existingUser = await User.findOne({});

        // If there are no users, create a new one
        if (!existingUser) {
            const newUser = await User.create({
                email,
                password,
                name: "Antimatter Admin",
                title: "Administrator",
                role: "admin"
            });
        }

    } catch (error) {
        console.error('Error creating user:', error);
    }


    // Init settings
    try {
        // Check if any settings exist
        const existingSettings = await Setting.findOne({});

        // If there are no users, create a new one
        if (!existingSettings) {
            const newSettings = await Setting.insertMany([
                {name: "categories", value: ["Audit", "Cloud", "Network", "Physical", "Web"]},
                {name: "colors", value: {
                    critical: "",
                    high: "",
                    moderate: "",
                    low: "",
                    informational: ""
                }}
            ])
        }

    } catch (error) {
        console.error('Error initializing settings:', error);
    }
}

module.exports = mongoSeed