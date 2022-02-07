const router = require('express').Router();
const { Dungeon } = require('../../models');
const withAuth = require('../../utils/auth.js')


//endpoint /api/dungeon

// Could eventually add ability to find rooms and key NPCs attached to dungeon

// route for adding new dungeon
router.post('/', withAuth, (req, res) => {
        console.log(req.body);
        Dungeon.create({
            ...req.body,
            campaign_id: req.session.campaign.id,
        })
            .then(data => {
                console.log('Dungeon posted.')
                console.log(data)
                res.redirect(`/dungeons/${data.dataValues.id}`);
            })
    });


//Update dungeon then redirects to main dungeon page
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const dunUpdate = await Dungeon.update(
            {
                name: req.body.updatedname,
            },
            {
                where: {
                    name: req.body.originalname,
                },
            }
        );
        // console.log(dunUpdate);
        res.redirect('/api/dungeon');

    } catch (err) {
        res.status(500).json(err);
    }
});


//deactivate dungeon
router.put('/delete/:delete', withAuth, async (req, res) => {
    try {
        const deactivate = await Dungeon.update(
            {
                is_active: req.body.is_active,
            },
            {
                where: {
                    id: req.params.delete,
                },
            }
        );
        res.status(200).json("Sucessfully 'deleted' dungeon");
        console.log(req.body)

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
