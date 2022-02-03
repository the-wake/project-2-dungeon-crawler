// I've console logged this out since I think it makes more sense just to enter the blurb as a string in the Room object. Technically this is a little more flexible, but I don't think there's much real value add.


// const { Model, DataTypes } = require('sequelize');
// const sequelize = require ('../config/connection.js')

// class Blurb extends Model {}


// Blurb.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             defaultValue: 'It is dark. You might be eaten by a grue.',
//         },
//         room_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'room',
//                 key: 'id',
//             },
//         },
//         is_read: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: true,
//         },

//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'campaign',
//     }
// );


// module.exports = Blurb;
