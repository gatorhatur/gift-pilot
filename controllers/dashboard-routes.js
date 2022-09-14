const router = require("express").Router();
const {
	Event,
	FriendList,
	ListItem,
	Purchase,
	SubbedEvent,
	User,
} = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
	ListItem.findAll({
		where: {
			// get user's list items
			user_id: req.session.user_id,
		},
		include: [
			{
				model: Purchase,
				include: [
					{
						model: User,
						attributes: ["username"],
					},
				],
			},
		],
	})
		.then((result) => {
			// serialize
			const gifts = result.map((gift) => gift.get({ plain: true }));
			res.render("dashboard", { gifts, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// get user friend list
router.get("/", withAuth, (req, res) => {
	// will need to set click functionality to users friend
	FriendList.findAll({
		where: { user_id: req.session.user_id },
		include: [
			{
				model: User,
				attributes: {
					exclude: ["password"],
				},
			},
		],
	})
		.then((result) => {
			// serialize data
			const friends = result.map((friend) => friend.get({ plain: true }));
			res.render("dashboard", { friends, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
