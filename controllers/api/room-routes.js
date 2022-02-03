const router = require('express').Router();
const { Room } = require('../../models');

//get all rooms
router.get('/', async (req, res) => {
    Room.findAll().then(roomData => {
        const rooms = roomData.map((rms) => rms.get({ plain: true }));
        res.render('room', { rooms });
    })
});

//add a room
router.post('/add-room', (req, res) => {
    console.log(req.body);
    Room.create(req.body).then(data => {
        console.log('Room posted.')
        res.redirect('/api/room');
    })
})


module.exports = router;