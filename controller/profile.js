const Profile = require("../models/Profile");

module.exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (profile) {
      return res.status(200).send(profile);
    }
    return res.status(400).json({ msg: "Profile not found" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.createProfile = async (req, res) => {
  const { instruments, experience, homeLocation } = req.body;
  try {
    let profile = await Profile.findOne({ user: req.user });
    if (profile) return res.status(400).json({ msg: "Profile Already exist" });
    // Create
    let profileFields = {};
    profileFields.user = req.user;

    if (instruments && instruments.length < 20)
      profileFields.instruments = instruments;
    if (experience && experience.length < 20)
      profileFields.experience = experience;
    if (homeLocation && homeLocation.length < 40)
      profileFields.homeLocation = homeLocation;

    profile = new Profile(profileFields);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Profile not updated" });
  }
};

module.exports.editProfile = async (req, res) => {
  let messages = [];
  const {
    instrument,
    experience,
    homeLocation,
    oldInstrument,
    newInstrument,
    delInstrument,
  } = req.body;

  try {
    let profile = await Profile.findOne({ user: req.user });

    if (!profile) return res.status(400).json({ msg: "Profile not exist" });

    // Add instrument to instruments array
    if (instrument) {
      if (
        instrument.length < 20 &&
        profile.instruments.length <= 10 &&
        !profile.instruments.includes(instrument)
      ) {
        profile.instruments.push(instrument);
        await profile.save();
      } else {
        messages.push("Instrument not added to instruments list");
      }
    }

    // Add experiance
    if (experience) {
      if (typeof experience === "number") {
        profile.experience = experience;
        await profile.save();
      } else {
        messages.push("Experience not updated");
      }
    }

    // Add home location
    if (homeLocation) {
      if (homeLocation.length < 40) {
        profile.homeLocation = homeLocation;
        await profile.save();
      } else {
        messages.push("Home location not updated");
      }
    }
    //   Delete item from instruments
    if (delInstrument) {
      if (profile.instruments.includes(delInstrument)) {
        profile.instruments.pop(delInstrument);
        await profile.save();
      } else {
        messages.push("Instrument not deleted");
      }
    }

    // Edit instrument
    if (newInstrument || !oldInstrument)
      messages.push("Old instrument not entered");
    if (oldInstrument || !newInstrument)
      messages.push("New instrument not entered");

    if (newInstrument && oldInstrument) {
      if (profile.instruments.includes(oldInstrument)) {
        profile.instruments.pop(oldInstrument);
        profile.instruments.push(newInstrument);
        await profile.save();
      }
    } else {
      messages.push("Instrument not found");
    }

    if (messages) {
      return res.status(200).json({ profile, msg: messages });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteProfile = async (req, res) => {
  try {
    if (req.body.sure === "OK") {
      const profile = await Profile.findOneAndDelete({ user: req.user });
      if (profile) return res.status(200).json({ msg: "Profile deleted" });
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(400).json({ msg: "Profile not deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Profile not deleted" });
  }
};
