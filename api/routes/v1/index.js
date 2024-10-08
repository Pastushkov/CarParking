const router = require("express")();

const adminRoutes = require("./admin/index");
const clientRoutes = require("./client/index");

router.use("/admin", adminRoutes);
router.use("/client", clientRoutes);

module.exports = router;
