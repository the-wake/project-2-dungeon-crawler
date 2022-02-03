const { Campaign } = require('../models');

const campaignData = [
    {
        name: 'Princes of the Apocalypse',
    },
    {
        name: 'Curse of Strahd',
    },
    {
        name: 'Out of the Abyss',
        is_active: false,
    }
];


const seedCampaigns = () => Campaign.bulkCreate(campaignData);

module.exports = seedCampaigns;
