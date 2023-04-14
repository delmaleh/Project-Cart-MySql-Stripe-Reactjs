const router = require('express').Router();

const orderController = require('../controllers/order');



router.post('/',orderController.create_order_details);


module.exports = router;