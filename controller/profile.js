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
  const { instruments, experience, homeLocation, gender } = req.body;

  try {
    let profile = await Profile.findOne({ user: req.user });
    if (profile) return res.status(400).json({ msg: "Profile Already exist" });

    // Create
    let profileFields = {};
    profileFields.user = req.user;

    // Gender check
    if (!gender) return res.status(500).json({ msg: "gender is required" });
    if (gender !== "male" && gender !== "female")
      return res
        .status(500)
        .json({ msg: "gender need to be 'male' or 'female'" });

    profileFields.gender = gender;

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
    res.status(500).json({ msg: err });
    // res.status(500).json({ msg: "Profile not updated" });
  }
};

module.exports.editProfile = async (req, res) => {
  let messages = { gender: [], experience: [], location: [], instrument: [] };
  const {
    gender,
    instrument,
    experience,
    homeLocation,
    oldInstrument = "old", //A default word to check if there has been a change
    newInstrument = "new", //A default word to check if there has been a change
    delInstrument,
  } = req.body;

  try {
    let profile = await Profile.findOne({ user: req.user });
    if (!profile) return res.status(400).json({ msg: "Profile not exist" });

    if (gender) {
      if (gender === "male" || gender === "female") {
        profile.gender = gender;
        await profile.save();
      } else {
        messages.gender.push("Gender not updated.");
      }
    }
    // Add instrument to instruments array
    if (instrument) {
      if (instrument.length < 20) {
        if (profile.instruments.length <= 10) {
          if (!profile.instruments.includes(instrument)) {
            profile.instruments.push(instrument);
            await profile.save();
            messages.instrument.push(`${instrument} added.`);
          } else {
            messages.instrument.push("Instrument already exist");
          }
        } else {
          messages.instrument.push("Maximum 10 instruments");
        }
      } else {
        messages.instrument.push(
          "Item should have a maximum length of 20 characters"
        );
      }
    }

    // Add experiance
    if (experience) {
      if (typeof experience === "number") {
        profile.experience = experience;
        await profile.save();
        messages.experience.push("The experience has been updated.");
      } else {
        messages.experience.push("The experience has not been updated.");
      }
    }

    // Add home location
    if (homeLocation) {
      if (homeLocation.length < 40) {
        profile.homeLocation = homeLocation;
        await profile.save();
        messages.location.push("Home location updated.");
      } else {
        messages.location.push("Home location not updated.");
      }
    }
    //   Delete item from instruments
    if (delInstrument) {
      if (profile.instruments.includes(delInstrument)) {
        profile.instruments.pop(delInstrument);
        await profile.save();
        messages.instrument.push(
          "The instrument has been removed from the list."
        );
      } else {
        messages.instrument.push(
          "The instrument was not removed from the list."
        );
      }
    }

    // Edit instrument
    if (newInstrument.length < 20 && oldInstrument.length < 20) {
      if (newInstrument !== "new" && oldInstrument !== "old") {
        if (profile.instruments.includes(oldInstrument)) {
          profile.instruments.pop(oldInstrument);
          profile.instruments.push(newInstrument);
          await profile.save();
          messages.instrument.push(
            `${oldInstrument} was replaced by ${newInstrument} in the list`
          );
        }
      }
    } else {
      messages.instrument.push(
        "Item should have a maximum length of 20 characters"
      );
    }

    if (
      messages.experience.length === 0 &&
      messages.gender.length === 0 &&
      messages.location.length === 0 &&
      messages.instrument.length === 0
    ) {
      return res.status(200).json({ profile, msg: "No changes were made" });
    }
    return res.status(200).json({ profile, msg: messages });
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
