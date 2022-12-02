const express = require("express");
const router = express.Router();
const pmsController = require('../controller/pmsController')

router.post("/check", pmsController.checkPMSInfo );

router.get("/statuses", pmsController.getPMSStatus );

router.get("/details", pmsController.getSiteInfo);

router.post("/subscriptions", pmsController.createSubscription );

router.get("/subscriptions/:id", pmsController.getSubscription );

router.get("/rooms/:roomId", pmsController.getRoomInfo );

module.exports = router;
