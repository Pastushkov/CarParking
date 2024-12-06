const mongoose = require("mongoose");

const TariffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  startWorkingHours: {
    type: String,
    required: true,
  },
  endWorkingHours: {
    type: String,
    required: true,
  },
  freeTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tariff", TariffSchema);
