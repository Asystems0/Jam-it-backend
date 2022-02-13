const TokensBlackList = require("../models/TokensBlackList");

module.exports = function async(req, res, next) {
  //   Check if token in tokens black list
  const tokenInList = await TokensBlackList.find({
    token: req.header("x-auth-token"),
  });
  if (tokenInList) res.status(400).json({ msg: "Token is not valid" });
  else next();
};
