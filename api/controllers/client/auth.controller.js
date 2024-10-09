const Client = require("../../models/client");
const bcrypt = require("bcryptjs");
const { CLIENT_JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

const generateAccessToken = (candidate) => {
  const payload = {
    id: candidate.id,
    role: "client",
  };
  return jwt.sign(payload, CLIENT_JWT_SECRET);
};

const login = async (req, res) => {
  const { phone, password } = req.body;

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

  const isSame = await bcrypt.compare(password, existClient.password);

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
  const { phone, password, name } = req.body;

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
    name,
    phone,
    password: bcrypt.hash(password, 10),
  });

  return res.status(200).json({
    ok: true,
    payload: client,
  });
};

module.exports = {
  login,
  register,
};
