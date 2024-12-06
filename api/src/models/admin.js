const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  type: {
    type: String,
    default: "admin",
    immutable: true,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
