const express = require("express");
const router = express.Router();
const pmsController = require('../controller/pmsController')

router.post("/check", pmsController.checkPMSInfo );

router.get("/statuses", pmsController.getPMSStatus );

router.get("/details", pmsController.getSiteInfo);

router.post("/subscriptions", pmsController.createSub );

router.route("/subscriptions/:id")
    .get(pmsController.getSubById )
    .put(pmsController.updateSub)
    .delete(pmsController.deleteSub)

router.get("/rooms/:roomId", pmsController.getRoomById );

module.exports = router;
