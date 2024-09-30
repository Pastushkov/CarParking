const Admin = require("../../models/admin");
const Parking = require("../../models/parking");
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
    candiate = await Admin.findOne({ phone });
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

module.exports = {
  login,
};
