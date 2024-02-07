const router = require("express").Router();
const { getClients, createClient, deleteClient } = require("../controllers/clients-controller")
const auth = require("../middlewares/auth-middleware")

router.get("/", auth, getClients);
router.put("/", auth, createClient);
router.delete("/:clientId", auth, deleteClient);

module.exports = router;