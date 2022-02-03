const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection.js')

class Dungeon extends Model {}

Dungeon.init(
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
        campaign_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'campaign',
                key: 'id',
            },
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'dungeon',
    },
);

module.exports = Dungeon;
