const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.patch("/update", userCtrl.updateUser);

module.exports = router;
