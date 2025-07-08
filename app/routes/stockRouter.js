const express = require('express');
const router = express.Router();

const stock = require('../controllers/stock/stockAvailable')

router.get('/',stock.getAllStock);
router.get('/find',stock.findStockIdByProductId);
router.get('/update',stock.updateStock);
router.get('/nav',stock.changeStockToMatchNav);

module.exports = router;