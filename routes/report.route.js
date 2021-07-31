const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const ReportController = require('../controller/logic/expert/report.controller');

router.get('/v1/report', JWTMiddleware, checkAuthorization, ReportController.getExpertListReport);

router.post('/v1/report', JWTMiddleware, checkAuthorization, ReportController.sendReport);

module.exports = router;
