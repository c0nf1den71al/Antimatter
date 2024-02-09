const router = require("express").Router();
const { getEngagements, createEngagement, deleteEngagement, updateEngagement } = require("../controllers/engagements-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getEngagements);
router.put("/", auth, createEngagement);
router.delete("/:engagementId", auth, deleteEngagement);
router.post("/:engagementId", auth, updateEngagement)

module.exports = router;