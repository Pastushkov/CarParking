const mongoose = require("mongoose");
const { MONGO_URI, DEFAULT_ADMIN_PASSWORD } = require("../../config");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const dbInit = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  let existAdmin;

  try {
    existAdmin = await Admin.findOne();
  } catch (error) {
    console.log(error);
  }

  if (!existAdmin) {
    await Admin.create({
      name: "admin",
      phone: "380111111111",
      password: await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10),
    });
  }
};

const convertToObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {
  dbInit,
  convertToObjectId,
};
