const Car = require("../../models/car");
const Client = require("../../models/client");

const createCar = async (req, res) => {
  const { id } = req.user;
  const { plate, name } = req.body;

  let existCar;
  try {
    existCar = await Car.findOne({ plate });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while add car",
      error,
    });
  }

  if (existCar) {
    return res.status(400).json({
      ok: false,
      message: "Car with this plate already exist",
      error,
    });
  }

  let car;
  try {
    car = await Car.create({
      clientId: id,
      name,
      plate,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while add car",
      error,
    });
  }

  try {
    await Client.findByIdAndUpdate(id, {
      $push: { cars: car },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while add car to user",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: car,
  });
};

const deleteCar = async (req, res) => {
  const { _id } = req.params;

  try {
    await Car.deleteOne({ _id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while delete car",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: _id,
  });
};

module.exports = {
  deleteCar,
  createCar,
};
