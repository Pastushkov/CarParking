const router = require("express")();
const authRoutes = require("./auth.routes");
const parkingRoutes = require("./parking.routes");
const clientAuthMiddleware = require("../../../middlewares/auth.middleware");

router.use("/auth", authRoutes);
router.use("/parking", clientAuthMiddleware, parkingRoutes);

module.exports = router;
