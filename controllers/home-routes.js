const router = require('express').Router();

//homepage display
router.get('/', async (req, res) => {
    res.render('home-page');
    // res.status(200).json("working")
});

//login page display
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }

    res.render('login');
});


module.exports = router;
