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
  position: {
    type: {
      type: String,
      enum: ["Point"], // Тип має бути 'Point'
      default: "Point",
    },
    coordinates: {
      // Для зберігання геопозицій
      type: [Number], // Масив з довготи та широти
      required: true,
    },
  },
  // position: {
  //   lat: { type: Number, required: true },
  //   lng: { type: Number, required: true },
  // },
});
ParkingSchema.index({ position: '2dsphere' });
module.exports = mongoose.model("Parking", ParkingSchema);
