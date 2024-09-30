const router = require("express")();

const adminRoutes = require("./admin/index");

router.use("/admin", adminRoutes);

module.exports = router;
