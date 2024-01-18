const router = require("express").Router();

// Import routes
const authRoutes = require('./auth-routes');
// ...

// Use routes
router.use('/auth', authRoutes);
// ... 

module.exports = router;