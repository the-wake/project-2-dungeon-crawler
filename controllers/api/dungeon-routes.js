const router = require('express').Router();
const { Dungeon } = require('../../models');
const withAuth = require('../../utils/auth.js')


router.get('/', withAuth, (req, res) => {
    Dungeon.findAll({
        where: {
            is_active: true
        }
    }).then(dungeonData => {
        const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
        res.render('dungeon', { dungeons });
    })
});

//TODO: find dungeon by id, maybe find by campaign
// route to get one dungeon
router.get('/:id', withAuth, async (req, res) => {
    try {
        const dunData = await Dungeon.findByPk(req.params.id);
        if (!dunData) {
            res.status(404).json({ message: 'No dungeon with this id!' });
            return;
        }
        const dungeons = dunData.get({ plain: true });
        res.render('dungeon', dungeons);
        // console.log(dungeons)
    } catch (err) {
        res.status(500).json(err);
    };
});
//TODO: find rooms attached to dungeon

//Adds dungeon and then redirects to main dungeon page
router.post('/add-dungeon', withAuth, (req, res) => {
    console.log(req.body);
    Dungeon.create(req.body).then(data => {
        console.log('Dungeon posted.')
        res.redirect('/api/dungeon');
    })
});

//update dungeon by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dunUpdate = await Dungeon.update(
            {
                name: req.body.name,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json("Sucessfully updated dungeon name");
        // res.redirect('/api/dungeon');

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
