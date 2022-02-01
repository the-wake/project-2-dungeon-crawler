const router = require ('express').Router();
const { Dungeon } = require('../../models/Dungeon.js');


router.get('/', (req, res) => {
    res.render('index');
});



router.get('/list', (req, res) => {
    Dungeon.findAll().then(dungeonData => {
        res.render('dungeonList', dungeonData.dataValues);
    })
})


router.post('/add-dungeon', (req, res) => {
    console.log(req.body);
    Dungeon.create(req.body).then(data => {
        console.log('Dungeon posted.')
    })
})

module.exports = router;
