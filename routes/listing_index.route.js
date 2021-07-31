const express = require('express');

const router = express.Router();
const { StatisMiddleware } = require('../controller/http/middleware/Statis.middleware');

const ListingIndexController = require('../controller/logic/expert/listing_index.controller');

// listing index
router.get('/v1/getlistingindex', StatisMiddleware, ListingIndexController.getListingIndex);

module.exports = router;
