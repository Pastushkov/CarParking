const Parkings = require("../../models/parking");

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
    }).select("position address");
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error while find parking spots",
      error,
    });
  }

  const result = parkingSpots.map((spot) => ({
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

module.exports = { findNearestParking };
