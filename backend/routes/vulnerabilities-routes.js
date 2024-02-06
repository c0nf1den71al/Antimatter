const router = require("express").Router();
const { getVulnerabilities, createVulnerability, deleteVulnerability } = require("../controllers/vulnerabilities-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getVulnerabilities);
router.put("/", auth, createVulnerability);
router.delete("/:vulnerabilityId", auth, deleteVulnerability);

module.exports = router;