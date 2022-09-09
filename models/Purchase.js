const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Purchase extends Model {}

Purchase.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		listItem_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "listItem",
				key: "id",
			},
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
		name: "purchase",
	}
);

module.exports = Purchase;
