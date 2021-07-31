const express = require('express');

const router = express.Router();
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const ReviewController = require('../controller/logic/user/review.controller');

// review domain
router.post('/v1/createreview/:idlisting', JWTMiddleware, checkAuthorization, ReviewController.createReview);
router.get('/v1/review', JWTMiddleware, checkAuthorization, ReviewController.getReview);
router.get('/v1/reviewTwo', JWTMiddleware, checkAuthorization, ReviewController.getTwoReview);

module.exports = router;
