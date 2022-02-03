const { Creature } = require('../models');

const creatureData = [
    {
        name: 'Aerisi Kalinoth',
        room_id: 4,
        hp: 100,
        loot: 'Windvane\nRing of Invisibility',
        keyNpc: true,
    },
    {
        name: 'Yan-C-Bin',
        room_id: 4,
        hp: 200,
        keyNpc: true,
    },
    {
        name: 'Meheman',
        room_id: 3,
        hp: 10,
        loot: 'Potion of Invisibility',
    },
    {
        name: 'Gar Shatterkeel',
        room_id: 6,
        hp: 125,
        loot: 'Drown',
        keyNpc: true,
    },
    {
        name: 'Vannifer',
        room_id: 10,
        hp: 140,
        loot: 'Tinderstrike',
        keyNpc: true,
    },
];


const seedCreatures = () => Creature.bulkCreate(creatureData);

module.exports = seedCreatures;
