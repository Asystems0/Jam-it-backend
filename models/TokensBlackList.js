const mongoose = require("mongoose");

const TokensBlackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      min: 6,
      max: 256,
      unique: true,
    },
  },
  { timestamps: true }
);

TokensBlackListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = TokensBlackList = mongoose.model(
  "TokensBlackList",
  TokensBlackListSchema
);
