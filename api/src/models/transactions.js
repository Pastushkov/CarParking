const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // посилання на колекцію користувачів
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "withdraw"], // тип операції: поповнення або зняття
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  }, // джерело (напр. "банк", "PayPal")
  amount: {
    type: Number,
    required: true,
    min: 1,
  }, // сума операції
  date: {
    type: Date,
    default: Date.now,
  }, // дата операції
  status: {
    type: String,
    enum: ["completed", "pending", "failed"], // статус операції
    default: "pending",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
