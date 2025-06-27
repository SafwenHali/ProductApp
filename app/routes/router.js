const express = require('express');

const router = express.Router();

const navItems = require('./navItemsRouter');
const product = require('./productRouter')


router.use('/nav',navItems);
router.use('/product',product);

//router.use('/test',test);

module.exports = router;