const router = require('express').Router();
const { Room } = require('../../models');
const withAuth = require('../../utils/auth.js')

//get all rooms
router.get('/', withAuth, async (req, res) => {
    Room.findAll({
        where: {
            is_active: true
        }
    }).then(roomData => {
        const rooms = roomData.map((rms) => rms.get({ plain: true }));
        res.render('room', { rooms, loggedIn: req.session.loggedIn });
    })
});

//get room by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const roomData = await Room.findByPk(req.params.id);
        if (!roomData) {
            res.status(404).json({ message: 'No room with this id!' });
            return;
        }
        const rooms = roomData.get({ plain: true });
        res.render('campaign', { rooms, loggedIn: req.session.loggedIn });
        console.log(rooms)
    } catch (err) {
        res.status(500).json(err);
    };
});

//add a room
router.post('/add-room', withAuth, (req, res) => {
    console.log(req.body);
    Room.create(req.body).then(data => {
        console.log('Room posted.')
        res.redirect('/api/room');
    })
});

//update room by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const roomUpdate = await Room.update(
            {
                name: req.body.name,
                ///add other items to update
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json("Sucessfully updated room name");
        // res.redirect('/api/room');

    } catch (err) {
        res.status(500).json(err);
    }
});
//deactivate room
///Dont think that we need this, just deactivate the whole campaign
//maybe a delete to actually delete the room if needed
router.put('/delete/:delete', withAuth, async (req, res) => {
    try {
        const deactivate = await Room.update(
            {
                is_active: req.body.is_active,
            },
            {
                where: {
                    id: req.params.delete,
                },
            }
        );
        res.status(200).json("Sucessfully 'deleted' room");
        console.log(req.body)

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
