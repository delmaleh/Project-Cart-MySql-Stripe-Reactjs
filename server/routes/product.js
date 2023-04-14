const router = require('express').Router();

const productController = require('../controllers/product');


router.get('/category/:id',productController.get_products);
router.get('/category/search/:id',productController.get_search_products);
router.get('/category/parent/:id',productController.get_parent_products);
router.get('/:id',productController.get_product);
router.post('/',productController.create_product);
router.put('/:id',productController.update_product);
router.delete('/:id',productController.delete_product);


module.exports = router;