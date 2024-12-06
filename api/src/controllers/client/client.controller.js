const Client = require("../../models/client");
const Transactions = require("../../models/transactions");
const ParkingSessions = require("../../models/parkingSession");
const Tariff = require("../../models/tariff");

const getInfo = async (req, res) => {
  const { id } = req.user;
  let existClient;
  try {
    existClient = await Client.findById(id, {
      pin: false,
    }).populate({
      path: "cars",
      select: "name plate _id",
    });
  } catch (error) {
    console.log("GET CLIENT: ", error);
    return res.status(500).json({
      ok: false,
      message: "Error while get client",
      error,
    });
  }

  if (!existClient) {
    console.log("404: ");
    return res.status(404).json({
      ok: false,
      message: "User not found",
    });
  }

  let parkingSession;
  try {
    parkingSession = await ParkingSessions.findOne({
      clientId: id,
      endParkingDate: undefined,
    }).populate(["parkingId", "carId"]);
  } catch (error) {
    console.log("GET parking: ", error);
    return res.status(500).json({
      ok: false,
      message: "Error while get parking session",
      error,
    });
  }

  let tariff;
  if (parkingSession) {
    try {
      tariff = await Tariff.findById(parkingSession.parkingId.tariffId);
    } catch (error) {
      console.log("GET TARIFF: ", error);
      return res.status(500).json({
        ok: false,
        message: "Error while get tarif",
        error,
      });
    }
  }
  return res.status(200).json({
    ok: true,
    payload: {
      client: existClient,
      parkingSession: parkingSession && {
        ...parkingSession?.toJSON(),
        tariff,
      },
    },
  });
};

const topUpBalance = async (req, res) => {
  const { id } = req.user;
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({
      ok: false,
      message: "amount required",
    });
  }

  try {
    await Client.findByIdAndUpdate(id, {
      $inc: {
        balance: amount,
      },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "Error while top up client balance",
      error,
    });
  }

  try {
    await Transactions.create({
      amount,
      clientId: id,
      source: "google pay",
      status: "completed",
      type: "deposit",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "Error while create transaction",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
  });
};

module.exports = {
  getInfo,
  topUpBalance,
};
