const router = require("express").Router();
const { getEngagements, createEngagement } = require("../controllers/engagements-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getEngagements);
router.put("/", auth, createEngagement);

module.exports = router;