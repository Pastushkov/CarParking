const Parking = require("../../models/parking");

const create = async (req, res) => {
  const data = req.body;
  let parking;
  try {
    parking = await Parking.create(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while create parking",
      error,
    });
  }
  return res.status(200).json({
    ok: true,
    payload: parking,
  });
};

const list = async (req, res) => {
  const { offset, limit } = req.query;
  let parkings;

  try {
    parkings = await Parking.find({}, {}, { skip: offset, limit }).populate(
      "tariffId"
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while get list of parkings",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: parkings,
  });
};

const deleteParking = async (req, res) => {
  const { _id } = req.params;

  try {
    await Parking.deleteOne({ _id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while delete parking",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: _id,
  });
};

const update = async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  let existParking;
  try {
    existParking = await Parking.findOne({
      address: data.address,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while update parking",
      error,
    });
  }

  if (existParking && existParking._id.toString() !== _id) {
    return res.status(400).json({
      ok: false,
      message: "Parking on this address alredy exist",
    });
  }
  existParking = null;

  let parking;
  try {
    parking = await Parking.findOneAndUpdate(
      {
        _id,
      },
      req.body,
      {
        new: true,
      }
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while update parking",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: parking,
  });
};

const getById = async (req, res) => {
  const { _id } = req.params;

  let parking;
  try {
    parking = await Parking.findOne({
      _id,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while get parking",
      error,
    });
  }

  if (!parking) {
    return res.status(404).json({
      ok: false,
      message: "parking not found",
    });
  }

  return res.status(200).json({
    ok: true,
    payload: parking,
  });
};

module.exports = {
  create,
  list,
  deleteParking,
  update,
  getById,
};
