const Campaign = require('./Campaign.js');
const Dungeon = require('./Dungeon.js');
const Room = require('./Room.js');
const Creature = require('./Creature.js');
const Doodad = require('./Doodad.js');
const Connection = require('./Connection.js');
const User = require('./User.js');


Campaign.hasMany(Dungeon, {
    foreignKey: 'campaign_id',
    onDelete: 'CASCADE',
});

Dungeon.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
});

Dungeon.hasMany(Room, {
    foreignKey: 'dungeon_id',
    onDelete: 'CASCADE',
});

Room.belongsTo(Dungeon, {
    foreignKey: 'dungeon_id',
});

Room.hasMany(Creature, {
    foreignKey: {
        name: 'in_room',
        allowNull: true,
    }
});

Creature.belongsTo(Room, {
    foreignKey: {
        name: 'in_room',
        allowNull: true,
    }
});

Room.hasMany(Doodad, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE',
});

Doodad.belongsTo(Room, {
    foreignKey: 'room_id',
});

Room.hasMany(Connection, {
    foreignKey: 'origin_id',
    onDelete: 'CASCADE',
});

Connection.belongsTo(Room, {
    foreignKey: 'origin_id',
});


module.exports = {
    Campaign,
    Dungeon,
    Room,
    Creature,
    Doodad,
    Connection,
    User,
};
