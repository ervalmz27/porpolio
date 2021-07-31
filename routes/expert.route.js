const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { validationMidlleware } = require('../controller/http/middleware/joiValidator');
const { logMiddleware } = require('../controller/http/middleware/log.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ExpertController = require('../controller/logic/expert/expert.controller');

// expert domain
router.post(
  '/v1/profileexpert/:id_customer',
  StatisMiddleware,
  validationMidlleware,
  ExpertController.submitProfile,
  logMiddleware
);
router.get('/v1/get-public-minimum-config', StatisMiddleware, ExpertController.getConfigMinimumRate);
router.get('/v1/get-user-minimum-config', JWTMiddleware, checkAuthorization, ExpertController.getConfigMinimumRate);
router.get('/v1/getprofileexpert', JWTMiddleware, checkAuthorization, ExpertController.getProfileExpert);
router.post('/v1/profileavailability', JWTMiddleware, checkAuthorization, ExpertController.changeAvail);
router.post('/v1/profileabout', JWTMiddleware, checkAuthorization, ExpertController.changeImage);
router.post('/v1/addexperience', JWTMiddleware, checkAuthorization, ExpertController.addBackgroundProfile);
router.post('/v1/editheadline', JWTMiddleware, checkAuthorization, ExpertController.editHeadline);
router.get('/v1/addexperience', JWTMiddleware, checkAuthorization, ExpertController.getBackgroundProfile);
// router.get('/v1/getAvailibityExpert/:idExpert');
// router.put('/v1/uploadimage', JWTMiddleware, checkAuthorization, ExpertController.tryUpload);

module.exports = router;
