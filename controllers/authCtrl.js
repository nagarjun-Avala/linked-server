const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const {
        fullname,
        email,
        linkedIn_profile,
        linkedIn_followers,
        password,
        category,
        gender,
      } = req.body;

      if (!fullname)
        return res.status(400).json({ msg: "Full Name cannot be empty." });
      if (!email)
        return res.status(400).json({ msg: "Email cannot be empty." });
      if (!linkedIn_profile)
        return res
          .status(400)
          .json({ msg: "LinkedIn Profile cannot be empty." });
      if (!linkedIn_followers)
        return res
          .status(400)
          .json({ msg: "LinkedIn Followers cannot be empty." });
      if (!password)
        return res.status(400).json({ msg: "Password cannot be empty." });

      let newEmail = email.toLowerCase().replace(/ /g, "");
      const user_email = await Users.findOne({ email: newEmail });
      if (user_email)
        return res.status(400).json({ msg: "This user email already exists." });

      const user_linkedIn_profile = await Users.findOne({ linkedIn_profile });
      if (user_linkedIn_profile)
        return res
          .status(400)
          .json({ msg: "This LinkedIn User profile already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        email: newEmail,
        linkedIn_profile,
        linkedIn_followers,
        password: passwordHash,
        category,
        gender,
      });
      await newUser.save();

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });

      res.json({
        msg: "Register success!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });
      if (!user.verified)
        return res.status(400).json({
          msg: "Account verification under process, Please wait.",
          access: false,
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });

      res.json({
        msg: "Login success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({ msg: "Please login now" });
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now" });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
