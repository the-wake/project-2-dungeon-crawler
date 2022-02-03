const { Doodad } = require('../models');

const doodadData = [
    {
        name: 'Trap door',
        type: 'secret',
        description: 'A secret passage to room ID 4.',
        room_id: 2,
    },
    {
        name: 'Bloodstains',
        type: 'misc',
        room_id: 1,
    },
    {
        name: 'Longsword +1',
        type: 'treasure',
        room_id: 9,
    },
    {
        name: 'Hot Springs',
        type: 'misc',
        description: 'A natural hot springs steams alluringly before you.',
        room_id: 3,
    },
    {
        name: 'Trapped chest',
        type: 'Trap',
        room_id: 9,
    },
];


const seedDoodads = () => Doodad.bulkCreate(doodadData);

module.exports = seedDoodads;
