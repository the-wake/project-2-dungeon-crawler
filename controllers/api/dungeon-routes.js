const router = require('express').Router();
// const { Dungeon } = require('../../models/Dungeon.js');
const { Dungeon } = require('../../models');


router.get('/', (req, res) => {
    Dungeon.findAll().then(dungeonData => {
        const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
        res.render('dungeon', { dungeons });
    })
});

//TODO: find dungeon by id, maybe find by campaign
//TODO: find rooms attached to dungeon

//Adds dungeon and then redirects to main dungeon page
router.post('/add-dungeon', (req, res) => {
    console.log(req.body);
    Dungeon.create(req.body).then(data => {
        console.log('Dungeon posted.')
        res.redirect('/api/dungeon');
    })
})



module.exports = router;