
const router = require('express').Router();

var userRoute = require('./user');
var categoryRoute = require('./category');
var productRoute = require('./product');
var addressRoute = require('./address');
var civilityRoute = require('./civility');
var countryRoute = require('./country');
var paymentRoute = require('./payment');
var orderRoute = require('./order');
var orderDetailsRoute = require('./orderdetails');

router.use('/users',userRoute);
router.use('/categories',categoryRoute);
router.use('/products',productRoute);
router.use('/addresses',addressRoute);
router.use('/civilities',civilityRoute);
router.use('/countries',countryRoute);
router.use('/stripe',paymentRoute);
router.use('/orderdetails',orderDetailsRoute);
router.use('/orders',orderRoute);
module.exports = router;