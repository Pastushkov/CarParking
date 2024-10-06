const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: Number,
    min: 10,
    required: true,
  },
  occupied: {
    type: String,
    required: true,
    default: 0,
  },
  tariffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tariff",
    required: true,
  },
  floorCount: {
    type: Number,
    required: true,
  },
  possition: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Parking", ParkingSchema);
