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
        // If creating a creature from a room, we can make this auto-fill to the currently focused room in the API call.
        in_room: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'room',
                key: 'name',
            },
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
        key_npc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_alive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        modelName: 'creature',
    },
);

module.exports = Creature;
