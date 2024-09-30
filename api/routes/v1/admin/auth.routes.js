const router = require("express")();
const authController = require("../../../controllers/admin/auth.controller");
const adminAuthMiddleware = require("../../../middlewares/adminAuth.middleware");

router.post("/login", authController.login);
router.post("/register", adminAuthMiddleware, authController.register);

module.exports = router;
