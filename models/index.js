const Campaign = require('./Campaign.js');
const Dungeon = require('./Dungeon.js');
const Room = require('./Room.js');
const Creature = require('./Creature.js');
const Doodad = require('./Doodad.js');
// const Blurb = require('./Blurb.js');

// ASK ABOUT:
// * How to refer rooms to rooms (for connections) foreign-key-wise.
// * How to tie creatures to dungeons through rooms.

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
    foreignKey: 'room_id',
});

Creature.belongsTo(Room, {
    foreignKey: 'room_id',
});

Room.hasMany(Doodad, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE',
});

Doodad.belongsTo(Room, {
    foreignKey: 'room_id',
});


// Room.hasMany(Blurb, {
//     foreignKey: 'room_id',
//     onDelete: 'CASCADE',
// });

// Not certain how to tie creatures directly to dungeons.
// Dungeon.hasMany(Creature, {
//     through: {
//         model: DungeonCreature,
//         unique: false,
//     },
// });

// Creature.belongsTo(Dungeon, {
//     through: {
//         model: DungeonCreature,
//         unique: false,
//     },
// });


module.exports = {
    Campaign,
    Dungeon,
    Room,
    Creature,
    Doodad,
};
