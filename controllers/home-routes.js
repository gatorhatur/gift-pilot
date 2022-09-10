const router = require("express").Router();
const { User, ListItem, Purchase, FriendList } = require("../models");

router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;
