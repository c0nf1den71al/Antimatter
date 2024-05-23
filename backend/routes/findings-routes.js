const router = require("express").Router();
const {
  getFindings,
  createFinding,
  importVulnerability,
  deleteFinding,
  updateFinding,
} = require("../controllers/findings-controller");
const auth = require("../middlewares/auth-middleware");
const { updateOne } = require("../models/User");

router.get("/:engagementId", auth, getFindings);
router.put("/:engagementId", auth, createFinding);
router.put("/:engagementId/import", auth, importVulnerability);
router.delete("/:engagementId/:findingId", auth, deleteFinding);
router.post("/:engagementId/:findingId", auth, updateFinding);

module.exports = router;
