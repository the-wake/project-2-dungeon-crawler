const req = require('express/lib/request');
const { Room, Creature } = require('../models');
const withAuth = require('../utils/auth.js')

const router = require('express').Router();

//homepage display
router.get('/', async (req, res) => {
  res.render('home-page', { loggedIn: req.session.loggedIn })
  // res.status(200).json("working")
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
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
  // Otherwise, render the sign-up template
  res.render('sign-up');
});

router.get('/creatures', withAuth, (req, res) => {
  // If user isn't logged in, take them to login page.
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, return the list of creatures.
  Creature.findAll({
    where: {
      is_active: true,
    }
  })
  .then(creatureData => {
    const creatures = creatureData.map((ctrs) => ctrs.get({ plain: true }));
    res.render('creatures', { creatures, loggedIn: req.session.loggedIn });
  })
});

// Create new creature, with logic to find all active rooms and pass them to the validation.
router.get('/newcreature', withAuth, (req, res) => {
  Room.findAll({
    where: {
      is_active: true,
    }
  })
  .then(roomData => {
    const rooms = roomData.map((rms) => rms.get({ plain: true }));
    res.render('add-creature', { rooms, loggedIn: req.session.loggedIn });
  })
});

module.exports = router;
