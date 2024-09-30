const router = require("express")();

const tariffController = require("../../../controllers/admin/tariff.controller");

router.get("/list", tariffController.list);
router.get("/:_id", tariffController.getById);
router.patch("/:_id", tariffController.update);
router.post("/create", tariffController.create);
router.delete("/:_id", tariffController.deleteTariff);

module.exports = router;
