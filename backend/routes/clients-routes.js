const router = require("express").Router();
const { getClients, createClient } = require("../controllers/clients-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getClients);
router.put("/", auth, createClient); // Make this admin auth

module.exports = router;