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

module.exports = router;
