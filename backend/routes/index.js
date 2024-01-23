const router = require("express").Router();

// Import routes
const authRoutes = require('./auth-routes');
const engagementRoutes = require('./engagements-routes')
const clientRoutes = require('./clients-routes')
const vulerabilitiesRoutes = require('./vulnerabilities-routes')
// ...

// Use routes
router.use('/auth', authRoutes);
router.use('/engagements', engagementRoutes);
router.use('/clients', clientRoutes);
router.use('/vulnerabilities', vulerabilitiesRoutes)
// ... 

module.exports = router;