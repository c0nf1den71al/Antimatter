const router = require("express").Router();

// Import routes
const authRoutes = require('./auth-routes');
const engagementRoutes = require('./engagements-routes')
const clientRoutes = require('./clients-routes')
const vulerabilitiesRoutes = require('./vulnerabilities-routes')
const findingsRoutes = require('./findings-routes')
// ...

// Use routes
router.use('/auth', authRoutes);
router.use('/engagements', engagementRoutes);
router.use('/clients', clientRoutes);
router.use('/vulnerabilities', vulerabilitiesRoutes)
router.use('/findings', findingsRoutes)
// ... 

module.exports = router;