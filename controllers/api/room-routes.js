const router = require('express').Router();

router.get('/', async (req, res) => {
    // res.render('home-page');
    res.status(200).json("room")
});
module.exports = router;