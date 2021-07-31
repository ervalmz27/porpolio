const express = require('express');

const router = express.Router();
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const CityController = require('../controller/logic/user/city.controller');

router.post('/v1/latestcity/', StatisMiddleware, CityController.latestCity);
router.get('/v1/getcityall', StatisMiddleware, CityController.cityAll);

module.exports = router;
