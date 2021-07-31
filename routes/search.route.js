const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

// const SearchController = require('../controller/logic/expert/search.controller');
const Search = require('../controller/logic/search/search.controller');

// review domain
// router.get('/v1/search/listing', JWTMiddleware, checkAuthorization, SearchController.listing);
// router.get('/v1/search/categories', JWTMiddleware, checkAuthorization, SearchController.categories);
// router.get('/v1/search/topics', JWTMiddleware, checkAuthorization, SearchController.topics);
// router.get('/v1/search/tags', JWTMiddleware, checkAuthorization, SearchController.tags);

router.get('/v1/search', JWTMiddleware, checkAuthorization, Search.searchAll);

module.exports = router;
