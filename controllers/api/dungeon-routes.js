const router = require('express').Router();
const { Dungeon } = require('../../models');
const withAuth = require('../../utils/auth.js')
//endpoint /api/dungeon

//TODO: find dungeon by id, maybe find by campaign
//TODO: find rooms attached to dungeon

//get all dungeons
router.get('/', withAuth, (req, res) => {
    Dungeon.findAll({
        where: {
            is_active: true
        }
    }).then(dungeonData => {
        const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
        res.render('dungeon', { dungeons, loggedIn: req.session.loggedIn });
    })
});

//get route for updating dungeon
router.get('/update', withAuth, (req, res) => {
    Dungeon.findAll({
        where: {
            is_active: true
        }
    }).then(dungeonData => {
        const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
        res.render('update-dungeon', { dungeons, loggedIn: req.session.loggedIn });
    })
});

// route to get one dungeon
router.get('/id/:id', withAuth, async (req, res) => {
    try {
        const dunData = await Dungeon.findByPk(req.params.id);
        if (!dunData) {
            res.status(404).json({ message: 'No dungeon with this id!' });
            return;
        }
        const dungeons = dunData.get({ plain: true });
        res.render('dungeon', { dungeons, loggedIn: req.session.loggedIn });
        // console.log(dungeons)
    } catch (err) {
        res.status(500).json(err);
    };
});

//add route renders add-dungeon and redirects to dungeon after input
router.route('/add')
    .get(withAuth, (req, res) => {
        res.render('add-dungeon', { loggedIn: req.session.loggedIn });
    })
    .post(withAuth, (req, res) => {
        console.log(req.body);
        Dungeon.create(req.body).then(data => {
            console.log('Dungeon posted.')
            res.redirect('/api/dungeon');
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
