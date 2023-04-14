const router = require('express').Router();

const addressController = require('../controllers/address');


router.get('/customer/:id',addressController.get_addresses);
router.get('/:id',addressController.get_address);
router.get('/default/:id',addressController.get_default_address);
router.post('/',addressController.create_address);
router.put('/:id',addressController.update_address);
router.put('/default/:id',addressController.update_default_address);
router.put('/customer/default/:id',addressController.update_default_customer_address);

router.delete('/:id',addressController.delete_address);
router.put('/customer/:id',addressController.update_customer_address);

module.exports = router;