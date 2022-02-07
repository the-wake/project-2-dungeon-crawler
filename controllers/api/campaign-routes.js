const router = require('express').Router();
const { Campaign } = require('../../models');
const withAuth = require('../../utils/auth.js')


//endpoint /api/campaigns

// route to create a new campaign.
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    Campaign.create(req.body).then(data => {
        res.status(200).redirect('/campaigns');
    })
});
// To associate these with a specific user, we can use:
// Campaign.create({
//     ...req.body,
//     user_id: req.session.userId,
// }).then(data => {


//get route for updating campaign
router.get('/update', withAuth, (req, res) => {
    Campaign.findAll({
        where: {
            is_active: true
        }
    }
    ).then(campaignData => {
        const campaigns = campaignData.map((camps) => camps.get({ plain: true }));
        res.render('update-campaign', { campaigns, loggedIn: req.session.loggedIn });
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
