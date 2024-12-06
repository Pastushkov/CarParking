const router = require("express")();

const tariffController = require("../../../controllers/admin/tariff.controller");

router.get("/", tariffController.list);
router.get("/:_id", tariffController.getById);
router.patch("/:_id", tariffController.update);
router.post("/", tariffController.create);
router.delete("/:_id", tariffController.deleteTariff);

module.exports = router;
