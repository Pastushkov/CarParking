const router = require("express")();
const authController = require("../../../controllers/client/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/send-sms", authController.sendSms);
router.post("/verify-sms", authController.verifySms);
router.post("/find-user", authController.findUser);

module.exports = router;
