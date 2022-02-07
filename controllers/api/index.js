const router = require('express').Router();

const userRoutes = require('./user-routes');
const campaignRoutes = require('./campaign-routes');
const dungeonRoutes = require('./dungeon-routes');
const roomRoutes = require('./room-routes');
const creatureRoutes = require('./creature-routes');
const doodadRoutes = require('./doodad-routes');


router.use('/user', userRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/dungeons', dungeonRoutes);
router.use('/rooms', roomRoutes);
router.use('/creatures', creatureRoutes);
router.use('/doodads', doodadRoutes);


module.exports = router;
