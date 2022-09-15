const router = require("express").Router();
const { User, ListItem, Purchase, FriendList } = require("../models");
const withAuth = require("../utils/auth.js");

router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/home");
  }
});
router.get("/home", (req, res) => {
  //if a user is already logged in, redirect them to dashboard
  if (req.session.user_id) {
    res.redirect("/dashboard");
  } else {
    res.render("homepage");
  }
});
module.exports = router;
//withAuth redirects unauthorized user to login page
router.get("/dashboard", withAuth, (req, res) => {
  User.findOne({
    where: { id: req.session.user_id },
    include: [{ model: FriendList }, { model: ListItem }],
  })
    .then((data) => {
      const user = data.get({ plain: true });
      res.render("dashboard", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/:id", withAuth, (req, res) => {
  console.log(req.params.id);
  //sees if user is sneakily trying to view whos getting their gifts
  if (req.session.user_id == req.params.id) {
    res.redirect("/dashboard");
  }
  //includes list item, purchase data, and user data for each purchase
  User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: req.params.id },
    include: [
      {
        model: ListItem,
        include: [
          {
            model: Purchase,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "could not find user with this id" });
        return;
      }
      const user = dbUserData.get({ plain: true });

      //sends a purchases variable through to conditionally render purchase data
      res.render("user", { user, purchases: true, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
