const router = require("express")();
const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);

module.exports = router;
