const router = require("express").Router();
const verify = require("../middleware/verifyToken");

const { getUser, addUser, logIn, logOut } = require("../controller/auth");
const TokensBlackList = require("../models/TokensBlackList");

// @route   GET api/auth
// @desc    Get user by token
// @access  Public
router.get("/", verify, getUser);

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

module.exports = router;
