const { Room } = require('../models');

const roomData = [
    {
        name: 'F1: Descent',
        dungeon_id: 1,
    },
    {
        name: 'F2: Big Room',
        dungeon_id: 1,
    },
    {
        name: 'H1: Cavern',
        dungeon_id: 2,
    },
    {
        name: 'H2: Cold Room',
        dungeon_id: 2,
    },
    {
        name: 'P1: Galley',
        dungeon_id: 3,
    },
    {
        name: 'P2: Wet Room',
        dungeon_id: 3,
    },
    {
        name: 'B1: Chasm',
        dungeon_id: 4,
    },
    {
        name: 'B2: Stony Room',
        dungeon_id: 4,
    },
    {
        name: 'W1: Elevator',
        dungeon_id: 5,
    },
    {
        name: 'W2: Hot Room',
        blurb: 'It is not dark. You are unlikely to be eaten by a grue.',
        dungeon_id: 5,
    },
];


const seedRooms = () => Room.bulkCreate(roomData);

module.exports = seedRooms;
