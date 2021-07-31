const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { validationMidlleware } = require('../controller/http/middleware/joiValidator');
const { logMiddleware } = require('../controller/http/middleware/log.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ProfileController = require('../controller/logic/user/profile.controller');

router.post('/v1/profile/:id_customer', StatisMiddleware, validationMidlleware, ProfileController.regProfile, logMiddleware);

router.post('/v1/editprofile/:id_customer', JWTMiddleware, checkAuthorization, ProfileController.profile);

router.get('/v1/profile', JWTMiddleware, checkAuthorization, ProfileController.getProfile);

module.exports = router;
