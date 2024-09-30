const router = require("express")();
const parkingController = require("../../../controllers/admin/parking.controller");

router.post("/", parkingController.create);
router.get("/", parkingController.list);
router.delete("/:_id", parkingController.deleteParking);
router.patch("/:_id", parkingController.update);

module.exports = router;
