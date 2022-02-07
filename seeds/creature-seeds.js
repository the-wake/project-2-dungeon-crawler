const { Creature } = require('../models');

const creatureData = [
    {
        name: 'Aerisi Kalinoth',
        in_room: 4,
        hp: 100,
        loot: 'Windvane, Ring of Invisibility',
        key_npc: true,
    },
    {
        name: 'Yan-C-Bin',
        in_room: 4,
        hp: 200,
        key_npc: true,
    },
    {
        name: 'Meheman',
        in_room: 3,
        hp: 10,
        loot: 'Potion of Invisibility',
    },
    {
        name: 'Gar Shatterkeel',
        in_room: 6,
        hp: 125,
        loot: 'Drown',
        key_npc: true,
    },
    {
        name: 'Vannifer',
        in_room: 8,
        hp: 140,
        loot: 'Tinderstrike',
        key_npc: true,
    },
];


const seedCreatures = () => Creature.bulkCreate(creatureData);

module.exports = seedCreatures;
