require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD || "1111",
  CLIENT_JWT_SECRET: process.env.CLIENT_JWT_SECRET,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  INFOBIP_API_KEY: process.env.INFOBIP_API_KEY,
  INFOBIP_URL: process.env.INFOBIP_URL,
  STOPPER_ACCESS_TOKEN: process.env.STOPPER_ACCESS_TOKEN,
};
