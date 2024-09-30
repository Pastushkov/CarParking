const router = require("express")();

const parkingRoutes = require("./parking.routes");
const authRoutes = require("./auth.routes");
const tariffRoutes = require("./tariff.routes");

const adminController = require("../../../controllers/admin/admin.controller");

const adminAuthMiddleware = require("../../../middlewares/adminAuth.middleware");

router.use("/auth", authRoutes);
router.use("/tariff", adminAuthMiddleware, tariffRoutes);
router.use("/parking", adminAuthMiddleware, parkingRoutes);

router.get("/", adminAuthMiddleware, adminController.list);
router.get("/:_id", adminAuthMiddleware, adminController.getById);
router.patch("/:_id", adminAuthMiddleware, adminController.update);
router.delete("/:_id", adminAuthMiddleware, adminController.deleteAdmin);

module.exports = router;
