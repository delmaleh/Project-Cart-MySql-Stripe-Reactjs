const router = require('express').Router();

const categoryController = require('../controllers/category');


router.get('/parent/:id',categoryController.get_categories);
router.get('/:id',categoryController.get_category);
router.post('/',categoryController.create_category);
router.put('/:id',categoryController.update_category);
router.delete('/:id',categoryController.delete_category);


module.exports = router;