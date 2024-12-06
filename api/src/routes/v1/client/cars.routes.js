const router = require("express")();
const carsController = require("../../../controllers/client/cars.controller");

router.post("/", carsController.createCar);
router.delete("/:_id", carsController.deleteCar);

module.exports = router;
