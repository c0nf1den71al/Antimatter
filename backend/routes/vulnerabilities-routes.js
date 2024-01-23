const router = require("express").Router();
const { getVulnerabilities, createVulnerability } = require("../controllers/vulnerabilities-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getVulnerabilities);
router.put("/", auth, createVulnerability);

module.exports = router;