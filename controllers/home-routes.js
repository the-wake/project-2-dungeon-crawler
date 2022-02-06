const req = require('express/lib/request');
const { Campaign, Dungeon, Room, Creature } = require('../models');
const withAuth = require('../utils/auth.js')
const checkCampaign = require('../utils/helpers.js')

const router = require('express').Router();

//homepage display
router.get('/', async (req, res) => {
  res.render('home-page', { loggedIn: req.session.loggedIn })
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

// Serve campaigns page
router.get('/campaigns', withAuth, (req, res) => {
  Campaign.findAll({
    where: {
      is_active: true
    }
  }
  ).then(campaignData => {
    const campaigns = campaignData.map((camps) => camps.get({ plain: true }));
    res.render('campaigns', { campaigns, loggedIn: req.session.loggedIn });
  })
});

// Focuses a campaign by ID and renders dashboard
router.get('/campaigns/:id', withAuth, async (req, res) => {
  try {
    const campaignData = await Campaign.findByPk(req.params.id,
      {
        include: {model: Dungeon},
      });
    if (!campaignData) {
      res.status(404).json('No campaign with this id!');
      return;
    }

    const campaign = campaignData.get({ plain: true });
    console.log(campaign);

    req.session.save(() => {
      req.session.campaignId = campaign.id;
      // res.status(200).json(campaignData);
    });

    res.render('campaign-dashboard', { campaign, loggedIn: req.session.loggedIn });

  } catch (err) {
    res.status(500).json(err);
  };
});

// Serve dungeons page
router.get('/dungeons', withAuth, (req, res) => {
  Dungeon.findAll({
    where: {
      is_active: true
    }
  }).then(dungeonData => {
    const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
    res.render('dungeon', { dungeons, loggedIn: req.session.loggedIn });
  })
});

// TODO: Add single-dungeon page

// Serve creatures page
router.get('/creatures', withAuth, (req, res) => {
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

//get route to find a specific creature
router.get('/creatures/:id', withAuth, async (req, res) => {
  try {
    const ctrData = await Creature.findByPk(req.params.id);
    if (!ctrData) {
      res.status(404).json('No creature with this id!');
      return;
    }
    const creature = ctrData.get({ plain: true });
    console.log(creature);
    res.render('creature', { creature, loggedIn: req.session.loggedIn });

  } catch (err) {
    res.status(500).json(err);
  };
});

// Serves add-creature page.
router.get('/creatures/new', withAuth, (req, res) => {
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
