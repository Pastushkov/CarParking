const router = require("express")();

const adminRoutes = require("./admin/index");
const clientRoutes = require("./client/index");

router.get("/", (req, res) => {
  return res.status(200).json({
    alive: new Date(),
  });
});

router.use("/admin", adminRoutes);
router.use("/client", clientRoutes);

module.exports = router;
