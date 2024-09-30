const router = require("express")();

const tariffController = require("../../../controllers/admin/tariff.controller");

router.post("/create", tariffController.create);
router.get("/list", tariffController.list);
router.delete("/:_id", tariffController.deleteTariff);
router.patch("/:_id", tariffController.update);

module.exports = router;
