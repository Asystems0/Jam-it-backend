const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const { addUser, logIn, logOut } = require("../controller/auth");
const TokensBlackList = require("../models/TokensBlackList");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", addUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", logIn);

// @route   GET api/auth/logout
// @desc    log out user & destroy token
// @access  private
router.get("/logout", verify, logOut);

router.get("/h", verify, async (req, res) => {
  try {
    const tokenInList = await TokensBlackList.findOne({
      token: req.header("x-auth-token"),
    });
    if (tokenInList) {
      res.status(400).json({ msg: "Access Denied" });
    }
    res.status(200).json({ msg: "OK" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
