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

router.get("/", withAuth, async (req, res) => {
	try {
		const listItemData = await ListItem.findAll({
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
			raw: true,
			nest: true,
		});

		const friendData = await FriendList.findAll({
			// use finall method to retrieve array
			where: { friend_id: req.session.user_id },
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password"],
					},
				},
			],
			raw: true,
			nest: true,
		});

		console.log(friendData);

		res.render("dashboard", {
			gifts: listItemData,
			friends: friendData,
			loggedIn: true,
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
