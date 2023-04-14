const router = require('express').Router();

const orderController = require('../controllers/order');


router.post('/:id',orderController.create_order);
router.put('/:id',orderController.update_order);
router.get('/:id',orderController.get_orders);


module.exports = router;