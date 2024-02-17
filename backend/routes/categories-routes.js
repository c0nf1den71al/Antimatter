const router = require("express").Router();
const { getCategories, createCategory, deleteCategory } = require("../controllers/categories-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getCategories);
router.put("/", auth, createCategory);
router.delete("/:categoryId", auth, deleteCategory);

module.exports = router;