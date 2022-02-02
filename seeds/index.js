const seedCampaigns = require('./campaign-seeds.js');
const seedDungeons = require('./dungeon-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCampaigns();
  console.log('\n----- CAMPAIGNS SEEDED -----\n');

  await seedDungeons();
  console.log('\n----- DUNGEONS SEEDED -----\n');

  process.exit(0);
};

seedAll();
