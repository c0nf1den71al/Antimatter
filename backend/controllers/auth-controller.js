const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.ANTIMATTER_TOKEN_SECRET, {
        expiresIn: 86400
    });
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        if (user.error) {
            res.status(401).json({
                error: user.error
            });
        } else {
            const token = createToken(user._id, user.email, user.role);
            res.status(200).json({
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                access_token: token
            });
        }
    } catch (err) {
        res.status(400).json({ error: "An error occured." });
    }
}

module.exports.verifyJwt = async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.jwt, process.env.ANTIMATTER_TOKEN_SECRET)
        const user = await User.findOne({
            email: decoded.email
        });
        if (user) {
            res.status(200).json({
                email: user.email,
            });
        } else {
            res.status(401).json({
                message: "JWT Invalid."
            });
        }

    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: "JWT Invalid."
        });

    }
}