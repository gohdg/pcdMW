const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/pms/v2", require("./routes/pms"));

// app.get("/api/pms/v2", (req, res) => {
//   res.json({ success: "accessed Server" });
// });
app.use((req, res, next) => {
  // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send("Not Found");
});
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
