const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  updateUser: async (req, res) => {
    try {
      const {
        fullname,
        email,
        linkedIn_profile,
        linkedIn_followers,
        category,
        gender,
        dailyLimit,
      } = req.body;
      if (!fullname)
        return res.status(400).json({ msg: "Please add your full name." });

      await Users.findOneAndUpdate(
        { _id: req.body.user._id },
        {
          fullname,
          email,
          linkedIn_profile,
          linkedIn_followers,
          category,
          gender,
          dailyLimit,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
