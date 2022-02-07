const req = require('express/lib/request');
const { Campaign, Dungeon, Room, Creature } = require('../models');
const withAuth = require('../utils/auth.js')
const checkCampaign = require('../utils/helpers.js')

const router = require('express').Router();

//homepage display
router.get('/', async (req, res) => {
  console.log(req.session.campaign);
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

// Serve campaign creation page
router.get('/campaigns/new', withAuth, (req, res) => {
  res.render('add-campaign', { loggedIn: req.session.loggedIn });
});

// Focuses a campaign by ID and renders dashboard
router.get('/campaigns/:id', withAuth, async (req, res) => {
  try {
    const campaignData = await Campaign.findByPk(req.params.id,
      {
        include: {
          model: Dungeon, include: {
            model: Room, include: {
              model: Creature, where: {
                key_npc: true,
              }}}}
      })
    // We'll want to eventually also include associated creatures in this query so that the dashboard can display key NPCs. But those relationships aren't built into the index.js yet.
    if (!campaignData) {
      res.status(404).json('No campaign with this id!');
      return;
    }

    const campaign = campaignData.get({ plain: true });
    console.log(campaign);

    req.session.save(() => {
      req.session.campaign = {
        id: campaign.id,
        name: campaign.name
      }
      res.render('campaign-dashboard', { campaign, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
      console.log(req.session.campaign);
    });

  } catch (err) {
    res.status(500).json(err);
  };
});

// Serve campaign update page
router.get('/campaigns/:id/update', withAuth, (req, res) => {
  res.render('update-campaign', { loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
});

// Serve dungeons page
router.get('/dungeons', withAuth, checkCampaign, (req, res) => {
  Dungeon.findAll({
    where: {
      is_active: true
    },
    include: [{ model: Campaign }, { model: Room }],
  }).then(dungeonData => {
    const dungeons = dungeonData.map((duns) => duns.get({ plain: true }));
    res.render('dungeons', { dungeons, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  })
});

// Serve dungeon creation page
router.get('/dungeons/new', withAuth, (req, res) => {
  Campaign.findAll({
    where: {
      is_active: true
    }
  }).then(campaignData => {
    const campaigns = campaignData.map((duns) => duns.get({ plain: true }));
    // console.log(req.session.campaign);
    res.render('add-dungeon', { campaigns, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  })
});

// Serve single dungeon page
router.get('/dungeons/:id', withAuth, async (req, res) => {
  try {
    const dunData = await Dungeon.findByPk(req.params.id,
      { include: [{ model: Campaign }, { model: Room }] });
    if (!dunData) {
      res.status(404).json({ message: 'No dungeon with this id!' });
      return;
    }
    const dungeon = dunData.get({ plain: true });

    res.render('dungeon', { dungeon, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  } catch (err) {
    res.status(500).json(err);
  };
});

// get all rooms
router.get('/rooms', withAuth, async (req, res) => {
  Room.findAll({
    where: {
      is_active: true
    },
    include: {
      model: Dungeon,
    },
  }).then(roomData => {
    const rooms = roomData.map((rms) => rms.get({ plain: true }));
    res.render('rooms', { rooms, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  })
});

// render add room page
router.get('/rooms/new', withAuth, async (req, res) => {
  Dungeon.findAll({
    where: {
      is_active: true
    },
  }).then(dungeonData => {
    const dungeons = dungeonData.map((dngns) => dngns.get({ plain: true }));
    res.render('add-room', { dungeons, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  })
});

//get room by id
router.get('/rooms/:id', withAuth, async (req, res) => {
  try {
    const roomData = await Room.findByPk(req.params.id,
      {
        include: [
          { model: Dungeon },
          { model: Creature },
        ]
      });
    if (!roomData) {
      res.status(404).json({ message: 'No room with this id!' });
      return;
    }
    const room = roomData.get({ plain: true });
    // console.log(room);
    res.render('room', { room, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
  } catch (err) {
    res.status(500).json(err);
  };
});

// Serve creatures page
router.get('/creatures', withAuth, (req, res) => {
  Creature.findAll({
    where: {
      is_active: true,
    }
  })
    .then(creatureData => {
      const creatures = creatureData.map((ctrs) => ctrs.get({ plain: true }));
      res.render('creatures', { creatures, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
    })
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
      res.render('add-creature', { rooms, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });
    })
});

//get route to find a specific creature
router.get('/creatures/:id', withAuth, async (req, res) => {
  try {
    const ctrData = await Creature.findByPk(req.params.id, { include: { model: Room } });
    if (!ctrData) {
      res.status(404).json('No creature with this id!');
      return;
    }
    const creature = ctrData.get({ plain: true });
    res.render('creature', { creature, loggedIn: req.session.loggedIn, activeCampaign: req.session.campaign });

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
