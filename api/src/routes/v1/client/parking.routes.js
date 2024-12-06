const router = require("express")();
const parkingController = require("../../../controllers/client/parking.controller");

router.post("/find-nearest", parkingController.findNearestParking);
router.post("/start", parkingController.startParking);
router.post("/end", parkingController.endParking);

module.exports = router;
