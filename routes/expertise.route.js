const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ExpertiseController = require('../controller/logic/expert/expertise.controller');

// user expertise
router.get('/v1/get-public-expertise', StatisMiddleware, ExpertiseController.getExpertise);
router.get('/v1/get-user-expertise', JWTMiddleware, checkAuthorization, ExpertiseController.getExpertise);
router.post('/v1/get-latest-expertise', JWTMiddleware, checkAuthorization, ExpertiseController.getLatestExpertise);

router.put('/v1/profileexpertise', JWTMiddleware, checkAuthorization, ExpertiseController.updateProfileExpertise);

router.post('/v1/add-public-expertise', StatisMiddleware, ExpertiseController.addExpertise);
router.post('/v1/add-user-expertise', JWTMiddleware, checkAuthorization, ExpertiseController.addExpertise);

module.exports = router;
