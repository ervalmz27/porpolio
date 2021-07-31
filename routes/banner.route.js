const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const BannerController = require('../controller/http/cache/banner.controller');

router.get('/v1/getbanner', JWTMiddleware, checkAuthorization, BannerController.getBySectionName);

module.exports = router;
