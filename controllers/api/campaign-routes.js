const router = require('express').Router();
const { Campaign } = require('../../models');
const withAuth = require('../../utils/auth.js')
//endpoint /api/campaign

//route to get all campaigns
router.get('/', withAuth, (req, res) => {
    Campaign.findAll({
        where: {
            is_active: true
        }
    }
    ).then(campaignData => {
        const campaigns = campaignData.map((camps) => camps.get({ plain: true }));
        res.render('campaign', { campaigns });
    })
});

//get route for updating campaign
router.get('/update', withAuth, (req, res) => {
    Campaign.findAll({
        where: {
            is_active: true
        }
    }
    ).then(campaignData => {
        const campaigns = campaignData.map((camps) => camps.get({ plain: true }));
        res.render('update-campaign', { campaigns });
    })
});

// route to get one campaign
router.get('/id/:id', withAuth, async (req, res) => {
    try {
        const campData = await Campaign.findByPk(req.params.id);
        if (!campData) {
            res.status(404).json({ message: 'No campaign with this id!' });
            return;
        }
        const campaigns = campData.get({ plain: true });
        res.render('campaign', campaigns);
        console.log(campaigns)
    } catch (err) {
        res.status(500).json(err);
    };
});

//routes for add rending add-campaign and then redirecting to campaign after input
router.route('/add')
    .get(withAuth, (req, res) => {
        res.render('add-campaign');
    })
    .post(withAuth, (req, res) => {
        console.log(req.body);
        Campaign.create(req.body).then(data => {
            console.log('Campaign posted.')
            res.redirect('/api/campaign');
        })
    });


//update campaign by name then redirects to campaign page
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const campUpdate = await Campaign.update(
            {
                name: req.body.updatedname,
            },
            {
                where: {
                    name: req.body.originalname,
                },
            }
        );
        // console.log(campUpdate);
        res.redirect('/api/campaign');

    } catch (err) {
        res.status(500).json(err);
    }
});


//deactivate campaign
router.put('/delete/:delete', withAuth, async (req, res) => {
    try {
        const deactivate = await Campaign.update(
            {
                is_active: req.body.is_active,
            },
            {
                where: {
                    id: req.params.delete,
                },
            }
        );
        res.status(200).json("Sucessfully 'deleted' capaign");
        console.log(req)

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
