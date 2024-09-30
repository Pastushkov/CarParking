const Admin = require("../../models/admin");

const list = async (req, res) => {
  const { limit, offset } = req.query;

  let admins;
  try {
    admins = await Admin.find({
      limit,
      skip: offset,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while get admins list",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: admins,
  });
};

const getById = async (req, res) => {
  const { _id } = req.params;

  let admin;
  try {
    admin = await Admin.findOne({
      _id,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while get admin",
      error,
    });
  }

  if (!admin) {
    return res.status(404).json({
      ok: false,
      message: "Admin not found",
    });
  }

  return res.status(200).json({
    ok: true,
    payload: admin,
  });
};

const deleteAdmin = async (req, res) => {
  const { _id } = req.params;

  if (_id === req?.user?.id) {
    return res.status(400).json({
      ok: false,
      message: "You cannot delete yourself",
    });
  }

  try {
    await Admin.deleteOne({ _id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while delete admin",
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

  let existAdmin;
  try {
    existAdmin = await Admin.findOne({ phone: req.body.phone });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while update admin",
      error,
    });
  }

  if (existAdmin && existAdmin._id.toString() !== _id) {
    return res.status(400).json({
      ok: false,
      message: "Admin with this phone alredy exist",
    });
  }
  existAdmin = null;

  let admin;
  try {
    admin = await Admin.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while update admin",
      error,
    });
  }

  return res.status(200).json({
    ok: true,
    payload: admin,
  });
};

module.exports = {
  list,
  getById,
  deleteAdmin,
  update,
};
