const { Creature } = require('../models');

const creatureData = [
    {
        name: 'Aerisi Kalinoth',
        in_room: 'H2: Cold Room',
        hp: 100,
        loot: 'Windvane, Ring of Invisibility',
        key_npc: true,
    },
    {
        name: 'Yan-C-Bin',
        in_room: 'H2: Cold Room',
        hp: 200,
        key_npc: true,
    },
    {
        name: 'Meheman',
        in_room: 'H1: Cavern',
        hp: 10,
        loot: 'Potion of Invisibility',
    },
    {
        name: 'Gar Shatterkeel',
        in_room: 'P2: Wet Room',
        hp: 125,
        loot: 'Drown',
        key_npc: true,
    },
    {
        name: 'Vannifer',
        in_room: 'W2: Hot Room',
        hp: 140,
        loot: 'Tinderstrike',
        key_npc: true,
    },
];


const seedCreatures = () => Creature.bulkCreate(creatureData);

module.exports = seedCreatures;
