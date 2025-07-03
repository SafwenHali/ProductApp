const express = require('express');
const router = express.Router();

const ordreController = require('../controllers/commande/ordreController');

router.get('/send', ordreController.sendOrders);

module.exports = router;