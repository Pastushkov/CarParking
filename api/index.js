const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { PORT } = require("./config");
const { dbInit } = require("./services/db");
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/v1", require("./routes/v1"));

const appPort = PORT || 5000;
app.listen(appPort, async () => {
  await dbInit();
  console.log(`Server is running on port ${appPort}`);
});
