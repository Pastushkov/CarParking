const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "User",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // посилання на модель Car
    },
  ],
});

module.exports = mongoose.model("Client", ClientSchema);
