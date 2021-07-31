const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const ProfileExpertController = require('../controller/logic/expert/profile.controller');

router.patch('/v1/editProfileExpert', JWTMiddleware, checkAuthorization, ProfileExpertController.editProfileExpert);

module.exports = router;
