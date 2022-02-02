// Any model dependencies?
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Campaign extends Model {}

Campaign.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'campaign',
    },
);

module.exports = Campaign;
