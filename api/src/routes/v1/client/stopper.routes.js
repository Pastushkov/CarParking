const router = require("express")();
const stopperController = require("../../../controllers/client/stopper.controller");

router.get("/status", stopperController.status);

module.exports = router;
