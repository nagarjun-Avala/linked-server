const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");

router.route("/create").post(postCtrl.createPost);
router.route("/getAll").post(postCtrl.getPosts);

module.exports = router;
