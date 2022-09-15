const Event = require("./Event");
const FriendList = require("./Friend-list");
const ListItem = require("./List-item");
const User = require("./User");
const SubbedEvent = require("./Subbed-events");
const Purchase = require("./Purchase");

// user references back to itself via friendlist table
User.belongsToMany(User, {
  through: { model: FriendList, unique: false },
  as: "followers",
  foreignKey: "friend_id",
});

User.belongsToMany(User, {
  through: { model: FriendList, unique: false },
  as: "following",
  foreignKey: "user_id",
});

// // friendlist belongs to a specific user
FriendList.belongsTo(User, {
  foreignKey: "user_id",
});

// // user many have many friends via friendlist table
User.hasMany(FriendList, {
  foreignKey: "user_id",
});

// user can have many items
User.hasMany(ListItem, {
  foreignKey: "user_id",
});

// each item with unique description belongs to one user
ListItem.belongsTo(User, {
  foreignKey: "user_id",
});

// users can make many purchases
User.hasMany(Purchase, {
  foreignKey: "user_id",
});

// each purchase unique to a user
Purchase.belongsTo(User, {
  foreignKey: "user_id",
});

// list items can be purchased once
ListItem.hasOne(Purchase, {
  foreignKey: "listItem_id",
});

// each purchase unique to a list item
Purchase.belongsTo(ListItem, {
  foreignKey: "listItem_id",
  onDelete: "CASCADE",
});

// an event may belong to many users via subbed events
Event.belongsToMany(User, {
  through: SubbedEvent,
  as: "user_events",
  foreignKey: "user_id",
});

// a user may have many events through subbed events
User.belongsToMany(Event, {
  through: SubbedEvent,
  as: "event_users",
  foreignKey: "event_id",
});

SubbedEvent.belongsTo(Event, {
  foreignKey: "event_id",
});

SubbedEvent.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, FriendList, ListItem, SubbedEvent, Event, Purchase };
