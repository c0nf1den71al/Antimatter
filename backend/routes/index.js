const router = require("express").Router();

// Import routes
const authRoutes = require('./auth-routes');
const engagementRoutes = require('./engagements-routes')
const clientRoutes = require('./clients-routes')
// ...

// Use routes
router.use('/auth', authRoutes);
router.use('/engagements', engagementRoutes);
router.use('/clients', clientRoutes);
// ... 

module.exports = router;