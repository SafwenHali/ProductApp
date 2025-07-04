const express = require('express');

const router = express.Router();

const navItems = require('./navItemsRouter');
const product = require('./productRouter')
const commande = require('./commandeRouter')

const test = require('../services/commande/changeOrderStatus')


router.use('/nav',navItems);
router.use('/product',product);
router.use('/orders',commande);

router.use('/test',test.sendOrderStatus)

module.exports = router;