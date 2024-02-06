const router = require("express").Router();
const { getFindings, createFinding } = require("../controllers/findings-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/:engagementId", auth, getFindings);
router.put("/:engagementId", auth, createFinding); // Make this admin auth

module.exports = router;