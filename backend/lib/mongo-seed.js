const User = require("../models/User")

async function mongoSeed(){
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

            return true
        }

    } catch (error) {
        console.error('Error creating user:', error);
        return false
    }
}

module.exports = mongoSeed