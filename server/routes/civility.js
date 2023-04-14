const router = require('express').Router();

const civilityController = require('../controllers/civility');


router.get('/',civilityController.get_civilities);


module.exports = router;