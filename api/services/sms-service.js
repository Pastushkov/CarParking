// const twilio = require("twilio");
const { INFOBIP_API_KEY, INFOBIP_URL } = require("../config");
const axios = require("axios");
const smsVerifications = require("../models/smsVerifications");
const bcrypt = require("bcryptjs");
const smsVerificationsStatuses =
  require("../enums/enums").smsVerificationsStatuses;

// const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendSms = async (phone) => {
  return true;
  //808554

  if (!phone) {
    throw new Error("Phone required");
  }

  let existSmsVerification;
  try {
    existSmsVerification = await smsVerifications.findOne({
      phone,
      status: smsVerificationsStatuses.sended,
    });
  } catch (error) {
    console.log("error while find exist ver", error);
  }

  if (existSmsVerification) {
    try {
      await smsVerifications.updateOne(
        {
          phone,
          status: smsVerificationsStatuses.sended,
        },
        {
          status: smsVerificationsStatuses.declined,
        }
      );
    } catch (error) {
      console.log("error while mark sms ver as declined", error);
    }
  }

  const verificationCode = generateCode();

  let message;

  const smsData = {
    messages: [
      {
        destinations: [{ to: phone }],
        from: "447491163443",
        text: `Your verification code is: ${verificationCode}`,
      },
    ],
  };

  try {
    message = await axios.post(`${INFOBIP_URL}/sms/2/text/advanced`, smsData, {
      headers: {
        Authorization: `App ${INFOBIP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error while send code: ", error);
  }

  try {
    await smsVerifications.create({
      code: await bcrypt.hash(verificationCode.toString(), 10),
      phone,
      status: smsVerificationsStatuses.sended,
    });
  } catch (error) {
    console.log("Error while saving sended code: ", error);
  }
  return message.data;
};

const verifySms = async (phone, code) => {
  return true;

  if (!phone || !code) {
    return false;
  }

  let codeInDB;

  try {
    codeInDB = await smsVerifications.findOne({
      phone,
      status: smsVerificationsStatuses.sended,
    });
  } catch (error) {}

  if (!codeInDB) {
    console.log(
      "Error while verifySMS: code not found in DB for phone: ",
      phone
    );
    return false;
  }

  const isSame = await bcrypt.compare(code, codeInDB.code);

  if (isSame) {
    try {
      await smsVerifications.updateOne(
        {
          phone,
          status: smsVerificationsStatuses.sended,
        },
        {
          status: smsVerificationsStatuses.verified,
        }
      );
    } catch (error) {
      console.log("error while mark sms ver as verified", error);
    }
  }

  return isSame;
};

module.exports = {
  sendSms,
  verifySms,
};
