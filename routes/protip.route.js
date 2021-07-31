const express = require('express');

const router = express.Router();
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ProtipController = require('../controller/http/cache/protip.controller');

router.get('/v1/getprotip', StatisMiddleware, ProtipController.getBySectionName);

module.exports = router;
