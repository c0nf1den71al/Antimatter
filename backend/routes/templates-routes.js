const router = require("express").Router();
const {
  getTemplates,
  createTemplate,
  downloadTemplate,
} = require("../controllers/template-controller");
const auth = require("../middlewares/auth-middleware");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", auth, getTemplates);
router.put("/", [auth, upload.single("file")], createTemplate);
router.get("/:id", auth, downloadTemplate);

module.exports = router;
