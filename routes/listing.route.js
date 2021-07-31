const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const ListingController = require('../controller/logic/expert/listing.controller');

// listing domain
router.post('/v1/createlisting', JWTMiddleware, checkAuthorization, ListingController.createListing);
router.post('/v1/updatelisting/:idlisting', JWTMiddleware, checkAuthorization, ListingController.updateListing);
router.post('/v1/updatelistingstatus/:idlisting', JWTMiddleware, checkAuthorization, ListingController.updateListingStatus);
router.get('/v1/getlistingsample', JWTMiddleware, checkAuthorization, ListingController.getListingSample);
router.post('/v1/getlistingfilterid', JWTMiddleware, checkAuthorization, ListingController.getListingByIdExpert);
router.get('/v1/getlisting', JWTMiddleware, checkAuthorization, ListingController.getListing);
router.get('/v1/getlisting/:id', JWTMiddleware, checkAuthorization, ListingController.getListingDetail);
router.post('/v1/visit-count-listing/:idlisting', JWTMiddleware, checkAuthorization, ListingController.updateVisitCountListing);

// topic
router.get('/v1/gettopic', JWTMiddleware, checkAuthorization, ListingController.getTopic);
router.post('/v1/get-latest-topic', JWTMiddleware, checkAuthorization, ListingController.getLatestTopic);
router.post('/v1/visit-count-topic/:idtopic', JWTMiddleware, checkAuthorization, ListingController.updateVisitCountTopic);

// category
router.get('/v1/getcategory', JWTMiddleware, checkAuthorization, ListingController.getCategory);
router.post('/v1/get-latest-category', JWTMiddleware, checkAuthorization, ListingController.getLatestCategory);
router.post('/v1/visit-count-category/:idcategory', JWTMiddleware, checkAuthorization, ListingController.updateVisitCountCategory);

module.exports = router;
