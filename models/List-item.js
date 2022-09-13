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
			type: DataTypes.STRING(512),
			validate: {
				isUrl: true,
			},
		},
		item_img_url: {
			type: DataTypes.TEXT,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "list_item",
	}
);

module.exports = ListItem;
