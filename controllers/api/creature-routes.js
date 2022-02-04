const router = require('express').Router();
const { Creature } = require('../../models');
const withAuth = require('../../utils/auth.js')

//get all creatures
router.get('/', withAuth, (req, res) => {
    Creature.findAll({
        where: {
            is_active: true
        }
    }).then(creatureData => {
        const creatures = creatureData.map((ctrs) => ctrs.get({ plain: true }));
        res.render('creatures', { creatures, loggedIn: req.session.loggedIn });
    })
});

//get route to find a specific creature
router.get('/id/:id', withAuth, async (req, res) => {
    try {
        const ctrData = await Creature.findByPk(req.params.id);
        if (!ctrData) {
            res.status(404).json({ message: 'No creature with this id!' });
            return;
        }
        const creatures = ctrData.get({ plain: true });
        res.render('creatures', { creatures, loggedIn: req.session.loggedIn });
        // console.log(dungeons)
    } catch (err) {
        res.status(500).json(err);
    };
});

//add creature
router.route('/add')
    .get(withAuth, (req, res) => {
        res.render('add-creature', { loggedIn: req.session.loggedIn });
    })
    .post(withAuth, (req, res) => {
        Creature.create(req.body).then(data => {
            res.status(200).redirect('/newcreature');
        })
    });



module.exports = router;
