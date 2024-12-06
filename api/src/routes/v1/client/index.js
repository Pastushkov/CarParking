const router = require("express")();
const authRoutes = require("./auth.routes");
const clientRoutes = require("./client.routes");
const parkingRoutes = require("./parking.routes");
const carRoutes = require("./cars.routes");
const clientAuthMiddleware = require("../../../middlewares/auth.middleware");

router.use("/auth", authRoutes);
router.use("/client", clientAuthMiddleware, clientRoutes);
router.use("/parking", clientAuthMiddleware, parkingRoutes);
router.use("/cars", clientAuthMiddleware, carRoutes);

module.exports = router;
