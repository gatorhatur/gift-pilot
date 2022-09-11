const router = require("express").Router();
const { User, ListItem, Purchase, FriendList } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});
module.exports = router;
