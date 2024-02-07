const router = require("express").Router();
const { getFindings, createFinding, importVulnerability, deleteFinding } = require("../controllers/findings-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/:engagementId", auth, getFindings);
router.put("/:engagementId", auth, createFinding);
router.put("/:engagementId/import", auth, importVulnerability);
router.delete("/:engagementId/:findingId", auth, deleteFinding);

module.exports = router;