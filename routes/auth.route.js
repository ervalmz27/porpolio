const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { logMiddleware } = require('../controller/http/middleware/log.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const AuthController = require('../controller/logic/auth/auth.controller');

// register and auth
router.post('/v1/register', StatisMiddleware, AuthController.register);
router.post('/v1/checkrefferal', StatisMiddleware, AuthController.refferal);
router.post('/v1/checkotp/:id_customer_temp/:verifycode', StatisMiddleware, AuthController.verification);
router.post('/v1/resendotp', StatisMiddleware, AuthController.resendotp);
router.post('/v1/login', StatisMiddleware, AuthController.login, logMiddleware);
router.post('/v1/checkauthorization', JWTMiddleware, AuthController.checkAuthorization);
// router.post('/v1/forgotpass',AuthController.forgotPassword)
router.post('/v1/logout/:customer_id', JWTMiddleware, checkAuthorization, AuthController.logout);

module.exports = router;
