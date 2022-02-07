const router = require('express').Router();
const { Creature } = require('../../models');
const withAuth = require('../../utils/auth.js')

// Creates a new creature
router.post('/', withAuth, (req, res) => {
    const creatureData = {...req.body}
    if (creatureData.in_room === "") {
        creatureData.in_room = null
    }
    Creature.create(creatureData).then(data => {
        console.log(data);
        if (creatureData.in_room === null) {
            console.log(creatureData);
            res.status(200).redirect(`/creatures/${data.id}`);
            return;
        }
        res.status(200).redirect(`/rooms/${data.in_room}`);
    })
});


module.exports = router;
