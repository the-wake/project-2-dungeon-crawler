const router = require('express').Router();
const { Creature } = require('../../models');
const withAuth = require('../../utils/auth.js')

// Creates a new creature
router.post('/', withAuth, (req, res) => {
    Creature.create(req.body).then(data => {
        res.status(200).redirect('/creatures/new');
    })
});


module.exports = router;
