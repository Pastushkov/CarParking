const router = require("express")();
const parkingController = require("../../../controllers/client/parking.controller");

router.post("/find-nearest", parkingController.findNearestParking);

module.exports = router;
