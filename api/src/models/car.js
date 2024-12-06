const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  name: {
    type: String,
    require: true,
    default: "My car",
  },
  plate: {
    type: String,
    unique: true,
    require: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
