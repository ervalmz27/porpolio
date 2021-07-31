const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const PageController = require('../controller/http/cache/pages.controller');

router.get('/v1/getpages', JWTMiddleware, checkAuthorization, PageController.getPages);

module.exports = router;
