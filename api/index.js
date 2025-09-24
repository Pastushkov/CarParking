require("module-alias/register");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { PORT } = require("./config");
const { dbInit } = require("./src/services/db");
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url} Payload:`, req.body);
  const originalJson = res.json;

  // 3. Перевизначаємо res.json, щоб логувати дані
  res.json = function (body) {
    console.log("Response payload:", body);
    // 4. Викликаємо оригінальний метод, щоб відправити реальну відповідь
    originalJson.call(this, body);
  };

  next();
});

app.use("/v1", require("./src/routes/v1"));

const appPort = PORT || 5000;

app.listen(appPort, async () => {
  await dbInit();
  console.log(`Server is running on port ${appPort}`);
});
