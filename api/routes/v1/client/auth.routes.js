const router = require("express")();
const authController = require("../../../controllers/client/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
