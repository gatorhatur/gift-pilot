const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SubbedEvent extends Model {}

SubbedEvent.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "user",
				key: "id",
			},
		},
		event_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "event",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "subbed_event",
	}
);

module.exports = SubbedEvent;
