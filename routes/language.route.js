const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const LanguageController = require('../controller/logic/expert/language.controller');

// user language
router.get('/v1/get-public-language', StatisMiddleware, LanguageController.getLanguage);
router.get('/v1/get-user-language', JWTMiddleware, checkAuthorization, LanguageController.getLanguage);
router.post('/v1/get-latest-language', JWTMiddleware, checkAuthorization, LanguageController.getLatestLanguage);

router.put('/v1/profilelanguage', JWTMiddleware, checkAuthorization, LanguageController.updateProfileLanguage);

module.exports = router;
