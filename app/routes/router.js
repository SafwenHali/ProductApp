const express = require('express');

const router = express.Router();

const navItems = require('./navItemsRouter');
const product = require('./productRouter')

const test = require('../data/scripts/qauntity')


router.use('/nav',navItems);
router.use('/product',product);

router.use('/test',test.addStock);

module.exports = router;