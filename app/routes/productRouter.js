const express = require('express');
const router = express.Router();

const product = require('../controllers/product/productController')

router.get('/',product.getAllProductIDs);
router.get('/:id',product.getProductByID);
router.post('/new',product.createNewProduct);

module.exports = router;