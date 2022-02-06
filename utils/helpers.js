// This hasn't been implemented for the MVP, but it's an easy way to require the user to select a campaign before proceeding (so that we can keep their data discrete by campaign).

const checkCampaign = (req, res, next) => {
    if (!req.session.campaign) {
      res.redirect('/campaigns');
    } else {
      next();
    }
  };
  
  module.exports = checkCampaign;
  