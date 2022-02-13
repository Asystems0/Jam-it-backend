const User = require("../models/User");
const TokensBlackList = require("../models/TokensBlackList");
const jwt = require("jsonwebtoken");
const { registerValidtaion, loginValidtaion } = require("../models/validation");
const bcrypt = require("bcryptjs");

module.exports.addUser = async (req, res) => {
  //VALIDATE THE DATA BEFORE WE A USER
  const { error } = registerValidtaion(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  //Checking if the user is already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ msg: "Email already exists" });

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    console.log("Added");
    //   Create and assign a token
    const token = await jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};

module.exports.logIn = async (req, res) => {
  // VALIDATE THE DATA BEFORE WE A USER
  const { error } = loginValidtaion(req.body);
  if (error) return res.status(400).json({ msg: error });

  // Chacking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

  //   Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ msg: "Invalid Credentials" });

  //   Create and assign a token
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

module.exports.logOut = async (req, res) => {
  //   console.log(req.headers["x-auth-token"]);
  try {
    const token = new TokensBlackList({
      token: req.headers["x-auth-token"],
    }).save();
    res.status(200).json({ msg: "Token expired" });
  } catch (err) {
    res.status(400).json({ message: "Still connect" });
  }
};
