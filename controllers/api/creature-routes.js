const router = require('express').Router();
const { Creature } = require('../../models');
const withAuth = require('../../utils/auth.js')

// Creates a new creature
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
