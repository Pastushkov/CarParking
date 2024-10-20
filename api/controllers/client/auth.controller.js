const Client = require("../../models/client");
const bcrypt = require("bcryptjs");
const { CLIENT_JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const smsService = require("../../services/sms-service");

const generateAccessToken = (candidate) => {
  const payload = {
    id: candidate.id,
    role: "client",
  };
  return jwt.sign(payload, CLIENT_JWT_SECRET, { expiresIn: "100d" });
};

const login = async (req, res) => {
  const { phone, pin } = req.body;

  let existClient;
  try {
    existClient = await Client.findOne({
      phone,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while login",
      error,
    });
  }

  if (!existClient) {
    return res.status(404).json({
      ok: false,
      message: "Account not found",
      payload: {
        redirectToRegister: true,
      },
    });
  }

  const isSame = await bcrypt.compare(pin, existClient.pin);

  if (!isSame) {
    return res.status(400).json({
      ok: false,
      message: "Invalid credentials",
    });
  }

  const token = generateAccessToken(existClient);

  return res.status(200).json({
    ok: true,
    payload: token,
  });
};

const register = async (req, res) => {
  const { phone, pin } = req.body;

  let existClient;
  try {
    existClient = await Client.findOne({
      phone,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while register",
      error,
    });
  }

  if (existClient) {
    return res.status(400).json({
      ok: false,
      message: "Phone number exist",
    });
  }

  const client = await Client.create({
    phone,
    pin: await bcrypt.hash(pin, 10),
  });

  return res.status(200).json({
    ok: true,
    payload: client,
  });
};

const sendSms = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      ok: false,
      message: "Phone number required",
    });
  }
  let message;
  try {
    message = await smsService.sendSms(phone);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "error while send SMS",
      error,
    });
  }
  return res.status(200).json({
    ok: true,
    payload: message,
  });
};

const verifySms = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({
      ok: false,
      message: "Phone number and code required",
    });
  }

  const success = await smsService.verifySms(phone, code);

  if (success) {
    return res.status(200).json({
      ok: true,
    });
  }

  return res.status(400).json({
    ok: false,
  });
};

const findUser = async (req, res) => {
  const { phone } = req.body;

  let existClient;
  try {
    existClient = await Client.findOne({
      phone,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while login",
      error,
    });
  }

  if (!existClient) {
    return res.status(404).json({
      ok: false,
      message: "Account not found",
      payload: {
        redirectToRegister: true,
      },
    });
  }

  return res.status(200).json({
    ok: true,
    payload: {
      processLogin: true,
    },
  });
};

module.exports = {
  login,
  register,
  sendSms,
  verifySms,
  findUser,
};
