const router = require('express').Router();

const countryController = require('../controllers/country');


router.get('/',countryController.get_countries);


module.exports = router;