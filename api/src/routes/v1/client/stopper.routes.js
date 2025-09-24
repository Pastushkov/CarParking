const router = require("express")();
const stopperController = require("../../../controllers/client/stopper.controller");

router.get("/status", stopperController.status);
router.get("/execute", stopperController.execute4Line);
router.get("/on", stopperController.on);
router.get("/off", stopperController.off);

module.exports = router;
