const router = require("express").Router();
const { login, verifyJwt } = require("../controllers/auth-controller")

router.post("/login", login);
router.post("/verify", verifyJwt);

module.exports = router;