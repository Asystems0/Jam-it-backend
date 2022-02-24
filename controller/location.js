const Location = require("../models/Location");

module.exports.addLocation = async (req, res) => {
  const { lat, lng } = req.body;
  if (lat.length < 20 && lng.length < 20) {
    try {
      let location = await Location.findOne({ user: req.user });
      if (location) {
        location.location.push({ lat, lng });
        await location.save();
      } else {
        let locationFields = {};
        locationFields.user = req.user;
        locationFields.location = [];
        locationFields.location.push({ lat, lng });
        location = new Location(locationFields);
        await location.save();
      }
      res.status(200).json(location);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  } else
    return res
      .status(500)
      .json({ msg: "Location should have a maximum length of 20 characters" });
};
