const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const CacheController = require('../controller/http/cache/cache.controller');

router.get('/v1/getcache', JWTMiddleware, checkAuthorization, CacheController.getHomepageCache);
router.post('/v1/updatecache', JWTMiddleware, checkAuthorization, CacheController.updateHomepageCache);

module.exports = router;
