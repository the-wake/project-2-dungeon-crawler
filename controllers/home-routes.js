const req = require('express/lib/request');

const router = require('express').Router();

//homepage display
router.get('/', async (req, res) => {
  res.render('home-page', { loggedIn: req.session.loggedIn })
  // res.status(200).json("working")
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    // res.redirect('/');
    // return;
  }
  // Otherwise, render the 'login' template
  res.render('login', { loggedIn: req.session.loggedIn });
});
router.get('/newuser', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('sign-up');
});

module.exports = router;
