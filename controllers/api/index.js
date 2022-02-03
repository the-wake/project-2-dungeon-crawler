const router = require('express').Router();

const userRoutes = require('./user-routes');
const campaignRoutes = require('./campaign-routes');
const dungeonRoutes = require('./dungeon-routes');
const roomRoutes = require('./room-routes');
const creatureRoutes = require('./creature-routes');
const doodadRoutes = require('./doodad-routes');
const blurbRoutes = require('./blurb-routes');


router.use('/user-routes', userRoutes);
router.use('/campaign', campaignRoutes);
router.use('/dungeon', dungeonRoutes);
router.use('/room', roomRoutes);
router.use('/creature', creatureRoutes);
router.use('/doodad', doodadRoutes);
router.use('/blurb', blurbRoutes);


module.exports = router;
