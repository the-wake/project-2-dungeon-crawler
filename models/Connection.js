const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Connection extends Model {}


Connection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // origin_name: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'room',
        //         key: 'name',
        //     }
        // },
        origin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'room',
                key: 'id',
            }
        },
        destination_name: {
            type: DataTypes.STRING,
            references: {
                model: 'room',
                key: 'name',
            }
        },
        destination_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'room',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'connection',
    },
);


module.exports = Connection;
