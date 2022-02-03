const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js')

class Creature extends Model {}

Creature.init(
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
        // This could be filled by an API call that would either put in average value or roll for hp.
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        loot: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        keyNpc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_alive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        // If creating a creature from a room, we can make this auto-fill to the currently focused room in the API call.
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'room',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'creature',
    },
);

module.exports = Creature;
