const router = require("express").Router();

const verify = require("../middleware/verifyToken");
const {
  getProfile,
  createProfile,
  editProfile,
  deleteProfile,
} = require("../controller/profile");

// @route   GET api/profile
// @desc    get user profile
// @access  Private
router.get("/", verify, getProfile);

// @route   POST api/profile/
// @desc    create user profile
// @access  Private
router.post("/", verify, createProfile);

// @route   PATCH api/profile/
// @desc    edit user profile
// @access  Private
router.patch("/", verify, editProfile);

// @route   DELETE api/profile/
// @desc    delete user profile
// @access  Private
router.delete("/", verify, deleteProfile);

module.exports = router;
