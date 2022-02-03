const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Room extends Model {}

// Need to figure out how we'd structure in connecting a room to another room.
Room.init(
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
        blurb: {
            type: DataTypes.STRING,
            defaultValue: 'It is dark. You are likely to be eaten by a grue.',
            allowNull: true,
        },
        dungeon_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dungeon',
                key: 'id',
            }
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
        modelName: 'room',
    },
);


module.exports = Room;
