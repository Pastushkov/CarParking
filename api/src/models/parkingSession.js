const mongoose = require("mongoose");

const parkingSessionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
    required: true,
  },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  startParkingDate: { type: Date, default: Date.now },
  endParkingDate: { type: Date },
  price: { type: Number, default: 0 }, // ціна за сесію
});

module.exports = mongoose.model("ParkingSession", parkingSessionSchema);
