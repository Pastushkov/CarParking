const Tariff = require("../../models/tariff");

const create = async (req, res) => {
  const data = req.body;

  let existTarif;
  try {
    existTarif = await Tariff.findOne({
      name: data.name,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while create tariff",
      error,
    });
  }

  if (existTarif) {
    return res.status(400).json({
      ok: false,
      message: "Tariff with this name already exist",
    });
  }
  existTarif = null;

  let tariff;
  try {
    tariff = await Tariff.create(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while create tariff",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: tariff,
  });
};

const list = async (req, res) => {
  const { offset, limit } = req.query;

  let tariffs;
  try {
    tariffs = await Tariff.find({}, {}, { skip: offset, limit });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while get list of tariffs",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: tariffs,
  });
};

const deleteTariff = async (req, res) => {
  const { _id } = req.params;

  try {
    await Tariff.deleteOne({ _id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while delete tariff",
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

  let existTarif;
  try {
    existTarif = await Tariff.findOne({
      name: data.name,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "error while update tariff",
      error,
    });
  }

  if (existTarif && existTarif._id.toString() !== _id) {
    return res.status(400).json({
      ok: false,
      message: "Tariff with this name alredy exist",
    });
  }
  existTarif = null;

  let tariff;
  try {
    tariff = await Tariff.findOneAndUpdate(
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
      message: "error while update tariff",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: tariff,
  });
};

const getById = async (req, res) => {
  const { _id } = req.params;

  let tariff;
  try {
    tariff = await Tariff.findOne({
      _id,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while get tariff",
      error,
    });
  }

  if (!tariff) {
    return res.status(404).json({
      ok: false,
      message: "tariff not found",
    });
  }

  return res.status(200).json({
    ok: true,
    payload: tariff,
  });
};

module.exports = {
  create,
  list,
  deleteTariff,
  update,
  getById,
};
