const router = require("express").Router();
const { User, ListItem, Purchase, FriendList } = require("../../models");
//get all users, can add parameters to the req body
router.get("/", (req, res) => {
	User.findAll({
		attributes: { exclude: ["password"] },
	})
		.then((dbUserData) => res.status(200).json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//create a new user/ sign up
router.post("/", (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		birthDate: req.body.birthDate,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.username = dbUserData.username;
				req.session.loggedIn = true;
				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
router.post("/login", (req, res) => {
	User.findOne({
		where: { email: req.body.email },
	}).then((dbUserData) => {
		if (!dbUserData) {
			res
				.status(400)
				.json({ message: "could not find user with that email address" });
			return;
		}
		const validPassword = dbUserData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect password" });
			return;
		}
		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: "login succesful" });
		});
	});
});
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
//get a list of all users friends
router.get("/friends", (req, res) => {
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
		.then((dbdata) => {
			res.status(200).json(dbdata);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
	// FriendList.findAll({
	// 	where: { user_id: req.session.user_id },
	// 	include: [{ model: User }],
	// })
	// 	.then((dbdata) => {
	// 		res.status(200).json(dbdata);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		res.status(400).json(err);
	// 	});
});
//make a new friend pairing given user id of friend as param
router.post("/friends/:username", (req, res) => {
	User.findOne({
		where: {
			username: req.params.username,
		},
		attributes: { exclude: ["password"] },
		include: [
			{
				model: FriendList,
			},
		],
	})
		.then((friend) => {
			FriendList.bulkCreate(
				{ user_id: req.session.user_id, friend_id: friend.friend_lists[0].friend_id },
				{ user_id: friend.friend_lists[0].friend_id, friend_id: req.session.user_id }
			);
		})
		.then((dbData) => res.status(200).json(dbData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

//use this route for viewing user lists
router.get("/:id", (req, res) => {
	//if a user is looking at their own page, do not include purchase data
	if (req.params.id === req.session.user_id) {
		User.findOne({
			where: { id: req.session.user_id },
			include: [{ model: ListItem }],
		})
			.then((data) => res.status(200).json(data))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	} else {
		User.findOne({
			attributes: { exclude: ["password"] },
			where: { id: req.params.id },
			include: [{ model: ListItem, include: [{ model: Purchase }] }],
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "could not find user with this id" });
					return;
				}
				res.status(200).json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
});
module.exports = router;
