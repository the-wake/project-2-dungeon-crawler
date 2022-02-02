const router = require('express').Router();
// const { Campaign } = require('../../models');


router.get('/', async (req, res) => {
    // res.render('home-page');
    res.status(200).json("campaign")


});
module.exports = router;