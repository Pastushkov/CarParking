const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

const generateAccessToken = (candidate) => {
  const payload = {
    id: candidate.id,
    role: "admin",
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  let candiate = null;

  try {
    candiate = await Admin.findOne({ phone }).select("password");
  } catch (error) {
    return res.status(400).json({
      message: "Incorect credentials",
    });
  }

  if (!candiate) {
    return res.status(400).json({
      message: "Incorect credentials",
    });
  }

  let isSame = await bcrypt.compare(password, candiate.password);

  if (!isSame) {
    return res.status(400).json({
      message: "Incorect credentials",
    });
  }

  const token = generateAccessToken(candiate);
  return res.status(200).json({
    ok: true,
    token,
  });
};

const register = async (req, res) => {
  const { password, phone } = req.body;

  let existAdmin;
  try {
    existAdmin = await Admin.findOne({
      phone,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while register admin",
      error,
    });
  }

  if (existAdmin) {
    return res.status(400).json({
      ok: false,
      message: "Admin with this phone already registered",
    });
  }
  existAdmin = null;

  let newAdmin;
  try {
    newAdmin = await Admin.create({
      ...req.body,
      password: await bcrypt.hash(password, 10),
      type: "admin",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while register admin",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: newAdmin,
  });
};

module.exports = {
  login,
  register,
};
