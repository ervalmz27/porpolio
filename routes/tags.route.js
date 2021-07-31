const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const TagsController = require('../controller/logic/expert/tags.controller');

// tags
router.get('/v1/gettags', JWTMiddleware, checkAuthorization, TagsController.getTags);
router.post('/v1/get-latest-tags', JWTMiddleware, checkAuthorization, TagsController.getLatestTags);
router.get('/v1/gettagsbyexpert', JWTMiddleware, checkAuthorization, TagsController.getTagsByExpert);
router.post('/v1/addtag', JWTMiddleware, checkAuthorization, TagsController.addTag);

module.exports = router;
