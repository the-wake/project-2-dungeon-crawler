const seedCampaigns = require('./campaign-seeds.js');
const seedDungeons = require('./dungeon-seeds.js');
const seedRooms = require('./room-seeds.js');
const seedCreatures = require('./creature-seeds.js');
const seedDoodads = require('./doodad-seeds.js');
const seedConnections = require('./connection-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCampaigns();
  console.log('\n----- CAMPAIGNS SEEDED -----\n');

  await seedDungeons();
  console.log('\n----- DUNGEONS SEEDED -----\n');

  await seedRooms();
  console.log('\n----- ROOMS SEEDED -----\n');

  await seedCreatures();
  console.log('\n----- CREATURES SEEDED -----\n');

  await seedConnections();
  console.log('\n----- CONNECTIONS SEEDED -----\n');

  await seedDoodads();
  console.log('\n----- DOODADS SEEDED -----\n');

  process.exit(0);
};

seedAll();
