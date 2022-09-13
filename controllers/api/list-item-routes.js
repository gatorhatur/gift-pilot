const router = require("express").Router();
const { ListItem, Purchase, User } = require("../../models");
const linkPreview = require("link-preview-js");
const withAuth = require("../../utils/auth")

//GET / ALL
router.get("/", (req, res) => {
	ListItem.findAll({
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
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//POST /
router.post("/", withAuth, async (req, res) => {
	/*
    Sample body
    {
        "item_desc": "this is a description",
        "item_url": "https://google.com"
    }
    get the user_id from session   
*/
	//protect against malicious redirects (protects against relative paths)
	if (req.body.item_url && req.body.item_url.match(/^\/[^\/\\]/)) {
		res.status(404).json({ message: "Please provide a different URL" });
		return;
	}

	const exists = await ListItem.findOne({
		where: {
			user_id: req.session.user_id,
			item_desc: req.body.item_desc,
		},
	}).then((checkData) => {
		if (checkData) {
			res.status(400).json({
				message: "An item in your list already exists with this description",
			});
			return true;
		}
		return false;
	});

	if (exists) {
		return;
	}

	const img_url = await linkPreview
		.getLinkPreview(req.body.item_url, {
			followRedirects: "follow",
		})
		.then((data) => {
			if (!data.images.length) {
				res.status(404).json({ message: "Unable to find an image" });
				return false;
			}
			console.log(data.images);
			return data.images;
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.json({ message: "Something went wrong with fetching an image" });
			return false;
		});

	console.log(img_url);
	if (!img_url) {
		return;
	}

    ListItem.create({
        item_desc: req.body.item_desc,
        item_url: req.body.item_url,
        item_img_url: img_url[0],
        //user_id: req.body.user_id
        user_id: req.session.user_id
    })
        .then(createData => res.json(createData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
})
    

//DELETE /:id
router.delete("/:id", withAuth, (req, res) => {
	ListItem.destroy({
		where: { id: req.params.id },
	})
		.then((destroyData) => {
			if (!destroyData) {
				res.status(404).json({
					message:
						"There is no list item with this id or has already been deleted",
				});
				return;
			}
			res.json({ message: "List item succesfully deleted" });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//POST /purchase
router.post("/purchase/:id", withAuth, async (req, res) => {
	const purchased = await Purchase.findOne({
		where: {
			id: req.params.id,
		},
	}).then((response) => {
		console.log(response);
		if (!response) {
			return false;
		}
		return true;
	});

	if (purchased) {
		res.status(400).json({
			message: "This item has already been purchased by someone else",
		});
		return;
	}

	Purchase.create({
		listItem_id: req.params.id,
		user_id: req.session.user_id,
		//user_id: req.body.user_id
	})
		.then((createData) => res.json(createData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//DELETE /purchase/:id
//The id is the id of the current listItem
router.delete("/purchase/:id", withAuth, (req, res) => {
	Purchase.destroy({
		where: { list_item_id: req.params.id },
	}).then((destroyData) => {
		if (!destroyData) {
			res.status(404).json({ message: "There is no purchase to delete" });
			return;
		}
		res.json({ message: "Purchases successfully reversed" });
	});
});

module.exports = router;
