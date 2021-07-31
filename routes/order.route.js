const express = require('express');

const orderController = require('../controller/logic/order/order.controller');
const checkAuthorization = require('../controller/http/middleware/checkAuthorization');
const { JWTMiddleware } = require('../controller/http/middleware/JWT.middleware');

const router = express.Router();

router.get('/v1/getBookingList', JWTMiddleware, checkAuthorization, orderController.getOrderList);
router.get('/v1/getBookingList/:bookingId', JWTMiddleware, checkAuthorization, orderController.getOrderById);
router.get('/v1/getBookingByStatus', JWTMiddleware, checkAuthorization, orderController.getOrderByStatus);
router.get('/v1/getBookingByExpert', JWTMiddleware, checkAuthorization, orderController.getOrderByExpert);
router.get('/v1/getBookingByCostumer', JWTMiddleware, checkAuthorization, orderController.getOrderByCostumer);
router.post('/v1/createbooking', JWTMiddleware, checkAuthorization, orderController.createOrder);
router.put('/v1/updateBooking/:bookingId', JWTMiddleware, checkAuthorization, orderController.updateOrder);
router.delete('/v1/deleteBooking', JWTMiddleware, checkAuthorization, orderController.deleteOrder);

module.exports = router;
