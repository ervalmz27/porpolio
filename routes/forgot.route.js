const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ForgotController = require('../controller/logic/user/forgot.controller');

router.post('/v1/forgotpass', StatisMiddleware, ForgotController.forgot);
router.post('/v1/changepass', JWTMiddleware, checkAuthorization, ForgotController.change);

module.exports = router;
