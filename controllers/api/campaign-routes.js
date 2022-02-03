const router = require('express').Router();
const { Campaign } = require('../../models');

// /api/campaign
router.get('/', (req, res) => {
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

// route to get one campaign
router.get('/:id', async (req, res) => {
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


//add a campaign
router.post('/add-campaign', (req, res) => {
    console.log(req.body);
    Campaign.create(req.body).then(data => {
        console.log('Campaign posted.')
        res.redirect('/api/campaign');
    })
})


//update campaign by id
router.put('/:id', async (req, res) => {
    try {
        const campUpdate = await Campaign.update(
            {
                name: req.body.name,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json("Sucessfully updated capaign name");
        // res.redirect('/api/campaign');

    } catch (err) {
        res.status(500).json(err);
    }
});


//deactivate campaign
router.put('/delete/:delete', async (req, res) => {
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
        console.log(req.body)

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;