const Event = require("./Event");
const FriendList = require("./Friend-list");
const ListItem = require("./List-item");
const User = require("./User");
const SubbedEvent = require("./Subbed-events");
const Purchase = require("./Purchase");

// user references back to itself via friendlist table
User.belongsToMany(User, {
	through: FriendList,
	as: "followers",
	foreignKey: "friend_id",
});

User.belongsToMany(User, {
	through: FriendList,
	as: "following",
	foreignKey: "user_id",
});

// friendlist belongs to a specific user
FriendList.belongsTo(User, {
	foreignKey: "user_id",
});

// user many have many friends via friendlist table
User.hasMany(FriendList, {
	foreignKey: "user_id",
});

// list items belong to one user via purchase
ListItem.belongsTo(User, {
	through: Purchase,
	as: "item_user",
	foreignKey: "user_id",
});

// user can have many list items via purchase
User.belongsToMany(ListItem, {
	through: Purchase,
	as: "user_items",
	foreignKey: "listItem_id",
});

// each purchase is done once
Purchase.belongsTo(ListItem, {
	foreignKey: "listItem_id",
});

Purchase.belongsTo(User, {
	foreignKey: "user_id",
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

module.exports = { Event, FriendList, ListItem, SubbedEvent, Event, Purchase };
