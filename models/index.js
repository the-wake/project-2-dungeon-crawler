const Campaign = require('./Campaign.js');
const Dungeon = require('./Dungeon.js');

Campaign.hasMany(Dungeon, {
    foreignKey: 'campaign_id',
    onDelete: 'CASCADE',
});

Dungeon.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
});


module.exports = {
    Campaign,
    Dungeon,
};
