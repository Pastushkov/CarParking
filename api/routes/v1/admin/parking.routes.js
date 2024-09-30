const router = require("express")();
const parkingController = require("../../../controllers/admin/parking.controller");

router.get("/", parkingController.list);
router.post("/", parkingController.create);
router.get('/:_id', parkingController.getById)
router.patch("/:_id", parkingController.update);
router.delete("/:_id", parkingController.deleteParking);

module.exports = router;
