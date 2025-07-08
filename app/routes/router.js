const express = require('express');

const router = express.Router();

const navItems = require('./navItemsRouter');
const product = require('./productRouter')
const commande = require('./commandeRouter')
const stock = require('./stockRouter')

const test = require('../services/getProducts');
const test2 = require('../models/product');


router.use('/nav',navItems);
router.use('/product',product);
router.use('/orders',commande);
router.use('/stock',stock);

router.use('/test',test.addMissingProducts)
router.use('/test2',test2.selectProductByRef)

module.exports = router;