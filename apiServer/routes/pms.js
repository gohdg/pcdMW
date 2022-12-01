const express = require("express");
const router = express.Router();

router.post("/check", (req, res) => {
  const { client_id, client_secret } = JSON.parse(req.headers.auth);
  const { name, pmsType, host, port, auth, pollingSeconds } = req.body;

  console.log(req.headers.auth);
  console.log(
    `${name} ${pmsType} ${host} ${port} ${auth.client_id} ${auth.client_secret} ${pollingSeconds}`
  );
  console.log(`check client_id: ${client_id}, client_secret: ${client_secret}`);
  res.json({
    success: `check client_id:`,
  });
});

router.get("/statuses", (req, res) => {
  console.log("statuses");
  res.json({ success: "statuses" });
});

router.get("/details", (req, res) => {
  console.log("details");
  res.json({ success: "details" });
});

router.post("/subscriptions", (req, res) => {
  console.log("subscriptions");
  res.json({ success: "subscriptions" });
});

router.get("/subscriptions/:id", (req, res) => {
  console.log(`subscription id: ${req.params.id}`);
  res.json({ success: `subscriptions id: ${req.params.id}` });
});

router.get("/rooms/:roomId", (req, res) => {
  console.log(`room number: ${req.params.roomId}`);
  res.json({ success: `room ${req.params.roomId}` });
});

module.exports = router;
