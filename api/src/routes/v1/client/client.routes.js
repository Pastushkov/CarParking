const router = require("express")();

const clientController = require("../../../controllers/client/client.controller");

router.get("/me", clientController.getInfo);
router.post("/topUp", clientController.topUpBalance);

module.exports = router;
