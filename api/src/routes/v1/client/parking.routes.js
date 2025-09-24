const router = require("express")();
const parkingController = require("../../../controllers/client/parking.controller");

router.post("/find-nearest", parkingController.findNearestParking);
router.post("/start", parkingController.startParking);
router.post("/end", parkingController.endParking);
router.post("/book", parkingController.bookPlace);
router.get("/book", parkingController.getUserBooking);
router.get("/book/onplace", parkingController.bookOnPlace);

module.exports = router;
