const router = require('express').Router();
const withAuth = require('../../utils/auth.js')

router.get('/', withAuth, async (req, res) => {
    // res.render('home-page');
    res.status(200).json("creature")
});


module.exports = router;