const express = require("express");

const { PORT } = require("./config");
const { dbInit } = require("./services/db");
const app = express();

app.use(express.json());

app.use("/v1", require("./routes/v1"));

const appPort = PORT || 5000;
app.listen(appPort, async () => {
  await dbInit();
  console.log(`Server is running on port ${appPort}`);
});
