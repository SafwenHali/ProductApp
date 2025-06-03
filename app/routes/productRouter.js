const express = require('express');
const router = express.Router();

const product = require('../controllers/product/productController')

router.get('/',product.getAllProductIDs);

module.exports = router;