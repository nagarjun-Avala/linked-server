const Posts = require("../models/postModal");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { post_link, category } = req.body;

      if (!post_link)
        return res.status(400).json({ msg: "Please add post link." });

      if (!category)
        return res.status(400).json({ msg: "Please select post category." });

      const newPost = new Posts({
        post_link,
        category,
        user: req.body.user._id,
      });
      await newPost.save();

      res.json({
        msg: "Post created.",
        newPost: {
          ...newPost._doc,
          user: req.body.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { category, limit = 10 } = req.body;
      const posts = await Posts.find({
        category: { $regex: category },
      })
        .sort("-createdAt")
        .limit(limit)
        .populate("user", "-password -verified");

      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postCtrl;
