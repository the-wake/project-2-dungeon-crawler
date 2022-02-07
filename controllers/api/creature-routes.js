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

// update creature by name, then redirect to campaign page
router.post('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const ctrUpdate = await Creature.update(
            {
                name: req.body.updatedname,
                in_room: req.body.updatedroom,
                hp: req.body.updatedhp,
                is_alive: req.body.updatedalive,
                loot: req.body.updatedloot,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        
        res.status(200).redirect(`/creatures/${req.params.id}`);

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
