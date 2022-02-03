// Doodads are extra things: Either a Treasure, a Trap, or a Secret. The models are interchangeable, so we're just going to make one model rather than three. We can then give the user a drop-down menu to select what type it will be.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Doodad extends Model {}

Doodad.init(
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
        type: {
            // Eventually validate to treasure, secret, obstacle, trap, or misc.
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: 'What could it be?',
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
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
        modelName: 'doodad',
    },
);


module.exports = Doodad;
