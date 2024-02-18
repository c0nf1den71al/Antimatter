const router = require("express").Router();
const { getSettings, updateSetting } = require("../controllers/settings-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getSettings);
router.post("/", auth, updateSetting);

module.exports = router;