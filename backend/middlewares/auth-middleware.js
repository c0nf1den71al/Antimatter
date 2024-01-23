const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.ANTIMATTER_TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    res.status(401).json({
                        error: 'Unauthorized'
                    });
                } else {
                    const user = await User.findById(decodedToken.id, {password: 0})
                    // Check that the id, email, and role all match
                    if (user && (user?.email === decodedToken.email) && (user?.role === decodedToken.role)) {
                        return next();
                    } else {
                        return res.status(401).json({
                            error: "Unauthorized"
                        })
                    }
                    
                }
            });
        } else {
            res.status(401).json({
                error: 'Unauthorized'
            });
        }
    } catch {
        res.status(401).json({
            error: 'Unauthorized'
        });
    }
}