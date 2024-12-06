const mongoose = require("mongoose");

const smsVerificationsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("smsVerifications", smsVerificationsSchema);
