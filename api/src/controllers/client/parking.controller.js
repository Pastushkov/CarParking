const Parkings = require("../../models/parking");
const ParkingSession = require("../../models/parkingSession");
const Parking = require("../../models/parking");
const Tariff = require("../../models/tariff");
const Client = require("../../models/client");
const Booking = require("../../models/booking");
const Transactions = require("../../models/transactions");
const stopperController = require("../../controllers/client/stopper.controller");

const findNearestParking = async (req, res) => {
  const { longitude, latitude } = req.body;

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ ok: false, message: "Coordinates are required" });
  }

  let parkingSpots;
  try {
    parkingSpots = await Parkings.find({
      position: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude],
          },
          $maxDistance: 10000, // meters (10 km)
        },
      },
    }).select("position address _id");
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while find parking spots",
      error,
    });
  }

  const result = parkingSpots.map((spot) => ({
    _id: spot._id,
    position: {
      lon: spot.position.coordinates[1],
      lat: spot.position.coordinates[0],
    },
    name: spot.address,
  }));

  return res.status(200).json({
    ok: true,
    payload: result,
  });
};

const newParking = async ({ clientId, parkingId, carId }) => {
  try {
    const activeSession = await ParkingSession.findOne({
      clientId,
      carId,
      endParkingDate: null,
    });

    if (activeSession) {
      return {
        status: 400,
        message: "You already have an active parking session.",
      };
    }

    // Створити нову сесію
    const session = await ParkingSession.create({
      clientId,
      parkingId,
      carId,
    });
    return {
      status: 200,
      message: "Parking session started.",
      payload: session,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Something went wrong.", error };
  }
};

const startParking = async (req, res) => {
  const { id: clientId } = req.user; // ID користувача
  const { parkingId, carId } = req.body;
  const { status, message, payload, error } = await newParking({
    clientId,
    parkingId,
    carId,
  });
  return res.status(status).json({
    message,
    payload,
    error,
  });
};

const endParking = async (req, res) => {
  const { id: clientId } = req.user;
  const { carId } = req.body;

  try {
    // Знайти активну сесію
    const session = await ParkingSession.findOne({
      clientId,
      carId,
      endParkingDate: null,
    });

    if (!session) {
      return res.status(404).json({
        ok: false,
        message: "No active parking session found.",
      });
    }

    // Завершити паркування
    session.endParkingDate = new Date();

    // Знайти тариф
    const parking = await Parking.findById(session.parkingId).populate(
      "tariffId"
    );
    const tariff = await Tariff.findById(parking.tariffId);

    if (!tariff) {
      return res.status(400).json({
        ok: false,
        message: "Tariff not found for this parking.",
      });
    }

    // Обчислити вартість
    const durationInHours = Math.ceil(
      (session.endParkingDate - session.startParkingDate) / (1000 * 60 * 60)
    );
    const price = durationInHours * tariff.pricePerHour;

    // Записати ціну в сесію
    session.price = price;
    await session.save();

    // Списати гроші з балансу користувача
    const user = await Client.findById(clientId);
    user.balance -= price;
    await user.save();

    // Додати транзакцію
    await Transactions.create({
      clientId,
      type: "withdraw",
      source: "Parking fee",
      amount: price,
      status: "completed",
    });

    const booking = await Booking.findOne({
      paringSessionId: session._id,
    });

    if (booking) {
      try {
        await Booking.updateOne(
          {
            _id: booking._id,
          },
          {
            status: "end",
          }
        );
      } catch (error) {
        console.error("error update booking", error);
      }
    } else {
      console.error("Bookign not found", session);
    }

    setTimeout(() => {
      stopperController.userOnPlace("on");
    }, 3000);

    return res.status(200).json({
      ok: true,
      message: "Parking session ended.",
      payload: {
        durationInHours,
        price,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

const bookPlace = async (req, res) => {
  const { id: clientId } = req.user; // ID користувача
  const { parkingId, carId } = req.body;
  const { status, message, payload, error } = await newParking({
    clientId,
    parkingId,
    carId,
  });

  if (status !== 200) {
    return res.status(status).json({
      message,
      payload,
      error,
    });
  }
  let newBooking = null;

  try {
    newBooking = await Booking.create({
      clientId,
      paringSessionId: payload._id,
      status: "new",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Error create booking",
    });
  }

  return res.status(200).json({
    message: "Place booked successfully",
    payload: newBooking,
  });
};

const getUserBooking = async (req, res) => {
  const { id: clientId } = req.user;
  try {
    const bookings = await Booking.find({
      clientId,
    });
    return res.status(200).json({
      ok: true,
      payload: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
      error,
    });
  }
};

const bookOnPlace = async (req, res) => {
  const { id: clientId } = req.user;
  let booking = null;
  try {
    booking = await Booking.findOne({
      clientId,
      status: "new",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Error bookOnPlace",
    });
  }
  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }

  try {
    booking = await Booking.updateOne(
      { _id: booking._id },
      {
        status: "on_place",
      }
    );
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Error update booking status",
    });
  }
  setTimeout(() => {
    stopperController.userOnPlace("off");
  }, 3000);

  return res.status(200).json({
    ok: true,
    message: "Stopper goes down!",
  });
};

module.exports = {
  findNearestParking,
  startParking,
  endParking,
  bookPlace,
  getUserBooking,
  bookOnPlace,
};
