const Parkings = require("../../models/parking");

const findNearestParking = async (req, res) => {
  const { longitude, latitude } = req.body;
  console.log("longitude: ", longitude);
  console.log("latitude: ", latitude);

  if (!longitude || !latitude) {
    console.log("here222");
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
            coordinates: [latitude, longitude], //[longitude, latitude],
          },
          $maxDistance: 10000, // Радіус у метрах (10 км)
        },
      },
    }).select("position address"); // Повернемо тільки координати і адресу (name)
  } catch (error) {
    console.log(error);
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
