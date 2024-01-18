// Import modules
const mongoose = require("mongoose");
const argon2 = require('argon2');
const sanitize = require("mongo-sanitize");

const { Schema } = mongoose;

const userSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    certifications: {
        type: Array,
        required: false,
        default: []
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["admin", "consultant", "viewer"],
        required: [true, "Role is required"],
    }
});

userSchema.pre("save", async function (next) {
    // Salt is not needed as argon2 already does this
    this.password = await argon2.hash(this.password);
    next();
});

userSchema.pre(["update", "findOneAndUpdate"], async function (next) {
    // Salt is not needed as argon2 already does this
    this._update.password = await argon2.hash(this._update.password);
    next();
});

userSchema.statics.login = async function (email, password) {
    email = sanitize(email);
    password = sanitize(password);

    const user = await this.findOne({ email });
    if (user) {
        const auth = await argon2.verify(user.password, password)
        if (auth) {
            return user;
        }
        return { error: "Email or password is incorrect." };
    }
    return { error: "Email or password is incorrect." };
};

module.exports = mongoose.model("users", userSchema);