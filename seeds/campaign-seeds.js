const { Campaign } = require('../models');

const campaignData = [
    {
        name: 'Princes of the Apocalypse',
    },
];


const seedCampaigns = () => Campaign.bulkCreate(campaignData);

module.exports = seedCampaigns;
