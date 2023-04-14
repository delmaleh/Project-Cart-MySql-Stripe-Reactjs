
const router = require('express').Router();

const paymentController = require('../controllers/payment');


router.post('/charge',paymentController.payment_charge);


module.exports = router;