const { Dungeon } = require('../models');

const dungeonData = [
    {
        name: 'The Fane of the Eye',
        campaign_id: 1,
    },
    {
        name: 'The Howling Caves',
        campaign_id: 1,
    },
    {
        name: 'The Plunging Torrents',
        campaign_id: 1,
    },
    {
        name: 'The Black Geode',
        campaign_id: 1,
    },
    {
        name: 'The Weeping Colossus',
        campaign_id: 1,
    }
];


const seedDungeons = () => Dungeon.bulkCreate(dungeonData);

module.exports = seedDungeons;
