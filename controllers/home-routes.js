const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('home-page');
    // res.status(200).json("working")
});

module.exports = router;
