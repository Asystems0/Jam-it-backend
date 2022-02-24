const router = require("express").Router();

const verify = require("../middleware/verifyToken");
const { addLocation } = require("../controller/location");

router.post("/", verify, addLocation);

module.exports = router;
