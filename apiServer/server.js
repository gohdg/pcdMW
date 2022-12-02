const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

// log 기록
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/pms/v2", require("./routes/pms"));

app.all('*', (req, res) => {
  res.status(404).json({ "error": "404 Not Found" });
  
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`API Server listening at port ${PORT}`));
