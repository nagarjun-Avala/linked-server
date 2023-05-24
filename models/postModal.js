const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post_link: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
