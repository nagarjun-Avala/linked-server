const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(500).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded)
      return res.status(500).json({ msg: "Invalid Authentication." });

    const user = await Users.findOne({ _id: decoded.id });
    if (!user.isAdmin)
      return res.status(500).json({ msg: "You not Authorized,Access denied." });
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = admin;
