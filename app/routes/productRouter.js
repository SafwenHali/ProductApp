const express = require('express');
const router = express.Router();

const product = require('../controllers/product/productController')

router.get('/',product.getAllProductIDs);
router.get('/id/:id',product.getProductByID);

router.get('/db',product.getProducts);
router.get('/ref',product.getProductRefs);

module.exports = router;