const router = require("express").Router();

// Import routes
const authRoutes = require("./auth-routes");
const engagementRoutes = require("./engagements-routes");
const clientRoutes = require("./clients-routes");
const vulerabilitiesRoutes = require("./vulnerabilities-routes");
const findingsRoutes = require("./findings-routes");
const logRoutes = require("./logs-routes");
const settingsRoutes = require("./settings-routes");
const tempateRoutes = require("./templates-routes");
// ...

// Use routes
router.use("/auth", authRoutes);
router.use("/engagements", engagementRoutes);
router.use("/clients", clientRoutes);
router.use("/vulnerabilities", vulerabilitiesRoutes);
router.use("/findings", findingsRoutes);
router.use("/logs", logRoutes);
router.use("/settings", settingsRoutes);
router.use("/templates", tempateRoutes);
// ...

module.exports = router;
