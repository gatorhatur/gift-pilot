const { FriendList, ListItem, Purchase, User } = require("../models");
const sequelize = require("../config/connection");
async function seed() {
  console.log("seeding...");
  await sequelize.sync({ force: true });
  await User.bulkCreate(
    [
      {
        username: "user1",
        email: "user1@user.com",
        password: "user1roolz",
      },
      {
        username: "user2",
        email: "user2@user.com",
        password: "user2roolz",
      },
      {
        username: "user3",
        email: "user3@user.com",
        password: "user3roolz",
      },
      {
        username: "user4",
        email: "user4@user.com",
        password: "user4roolz",
      },
    ],
    { individualHooks: true }
  );
  await ListItem.bulkCreate([
    {
      item_desc: "gift item 1",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 1,
    },
    {
      item_desc: "gift item 2",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 1,
    },
    {
      item_desc: "gift item 3",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 1,
    },
    {
      item_desc: "gift item 4",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 2,
    },
    {
      item_desc: "gift item 5",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 2,
    },
    {
      item_desc: "gift item 6",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 2,
    },
    {
      item_desc: "gift item 7",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 3,
    },
    {
      item_desc: "gift item 8",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 3,
    },
    {
      item_desc: "gift item 9",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 3,
    },
    {
      item_desc: "gift item 10",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 4,
    },
    {
      item_desc: "gift item 11",
      item_url: "https://google.com",
      item_img_url: "https://placeholder.pics/svg/300",
      user_id: 4,
    },
  ]);
  await FriendList.bulkCreate([
    {
      user_id: 1,
      friend_id: 2,
    },
    {
      user_id: 2,
      friend_id: 1,
    },
    {
      user_id: 3,
      friend_id: 4,
    },
    {
      user_id: 4,
      friend_id: 3,
    },
  ]);
  await Purchase.bulkCreate([
    {
      listItem_id: 1,
      user_id: 1,
    },
    {
      listItem_id: 3,
      user_id: 2,
    },
    {
      listItem_id: 4,
      user_id: 3,
    },
    {
      listItem_id: 9,
      user_id: 4,
    },
    {
      listItem_id: 7,
      user_id: 1,
    },
  ]);
  console.log("done seeding");
  process.exit(0);
}
seed();
