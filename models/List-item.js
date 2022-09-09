const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ListItem extends Model {}

ListItem.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		item_desc: {
			type: DataTypes.STRING,
		},
		item_url: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true,
			},
		},
		item_img_url: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		name: "list_item",
	}
);

module.exports = ListItem;
