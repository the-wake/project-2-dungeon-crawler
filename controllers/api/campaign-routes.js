const router = require('express').Router();
const { Campaign } = require('../../models');
const withAuth = require('../../utils/auth.js')


// endpoint /api/campaigns

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


// update campaign by name, then redirect to campaign page
router.post('/:id', withAuth, async (req, res) => {
    try {
        const campUpdate = await Campaign.update(
            {
                name: req.body.updatedname,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        // console.log(campUpdate);
        res.status(200).redirect(`/campaigns/${req.params.id}`);

    } catch (err) {
        res.status(500).json(err);
    }
});


//deactivate campaign
// router.put('/delete/:delete', withAuth, async (req, res) => {
//     try {
//         const deactivate = await Campaign.update(
//             {
//                 is_active: req.body.is_active,
//             },
//             {
//                 where: {
//                     id: req.params.delete,
//                 },
//             }
//         );
//         res.status(200).json("Sucessfully 'deleted' capaign");
//         console.log(req)

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
