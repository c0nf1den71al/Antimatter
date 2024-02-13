const router = require("express").Router();
const { getLogs } = require("../controllers/logs-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getLogs);

module.exports = router;