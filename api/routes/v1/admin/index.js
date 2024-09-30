const router = require("express")();

const parkingRoutes = require("./parking.routes");
const authRoutes = require("./auth.routes");
const tariffRoutes = require("./tariff.routes");

const adminAuthMiddleware = require("../../../middlewares/adminAuth.middleware");

router.use("/auth", authRoutes);
router.use("/tariff", adminAuthMiddleware, tariffRoutes);
router.use("/parking", adminAuthMiddleware, parkingRoutes);

module.exports = router;
