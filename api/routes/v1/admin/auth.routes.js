const router = require("express")();
const authController = require("../../../controllers/admin/auth.controller");

router.post("/login", authController.login);

module.exports = router;