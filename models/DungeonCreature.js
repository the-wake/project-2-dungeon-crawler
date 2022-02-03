// I think I might be able to tie Creatures to Dungeons this way, but I'm not 100% sure.

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class DungeonCreature extends Model {}

DungeonCreature.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        dungeon_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dungeon',
                key: 'id',
            },
        },
        creature_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dungeon',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'dungeon_creature',
    }
);

module.exports = DungeonCreature;
