const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    linkedIn_profile: {
      type: String,
      require: true,
    },
    linkedIn_followers: {
      type: Number,
      default: 0,
      require: true,
    },
    password: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    gender: { type: String, default: "male" },
    dailyLimit: {
      type: Number,
      default: 10,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
