const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  paringSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSession",
    required: true,
  },
  status: {
    type: String,
    default: "new",
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
