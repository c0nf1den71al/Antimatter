const router = require("express").Router();
const { getEngagements, createEngagement, deleteEngagement } = require("../controllers/engagements-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getEngagements);
router.put("/", auth, createEngagement);
router.delete("/:engagementId", auth, deleteEngagement);

module.exports = router;