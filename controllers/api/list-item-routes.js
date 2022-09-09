const router = require('express').Router();
const { ListItem, Purchase, User } = require('../../models');


//GET / ALL
router.get('/', (req, res) => {
    ListItem.findAll({
        include: [{
            model: Purchase, include: [{
                model: User, attributes: ['username']
            }]
            
        }]
    })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
})

//POST /
router.post('/', async (req, res) => {
/*
    Sample body
    {
        "item_desc": "this is a description",
        "item_url": "https://google.com"
    }
    get the user_id from session
*/
    const exists = await ListItem.findOne({
        where: {
            user_id: res.session.user_id,
            //user_id: req.body.user_id,
            item_desc: req.body.item_desc
        }
    })
        .then(checkData => {
            if (checkData) {
                res.status(400).json({ message: 'An item in your list already exists with this description' })
                return true
            }
            return false;
        })
    
    if (exists) {
        return;
    }

    const img_url = 'test' //grabity

    ListItem.create({
        item_desc: req.body.item_desc,
        item_url: req.body.item_url,
        item_img_url: img_url,
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
router.delete('/:id', (req, res) => {
    ListItem.destroy({
        where:{id: req.params.id}
    })
        .then(destroyData => {
            if (!destroyData) {
                res.status(404).json({ message: "There is no list item with this id or has already been deleted" });
                return;
            }
            res.json({message: "List Item succesfully deleted"})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
})

//POST /purchase
router.post('/purchase/:id', async (req, res) => {
    const purchased = await Purchase.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(response => {
            console.log(response)
            if (!response) {
                return false;
            }
            return true;
        })
        
    if (purchased) {
        res.status(400).json({ message: 'This item has already been purchased by someone else' })
        return;
    }

    Purchase.create({
        listItem_id: req.params.id,
        user_id: req.session.user_id
        //user_id: req.body.user_id
    })
        .then(createData => res.json(createData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
})

//DELETE /purchase/:id
//The id is the id of the current listItem
router.delete('/purchase/:id', (req, res) => {
    Purchase.destroy({
    where: {list_item_id: req.params.id}
  })
    .then(destroyData => {
      if (!destroyData) {
        res.status(404).json({ message: "There is no purchase to delete" });
        return;
      }
      res.json({ message: "Purchases successfully reversed" });
  })
})

module.exports = router;