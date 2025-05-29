const express = require('express');

const router = express.Router();

const navItems = require('./routes/navItemsRouter');

router.use('/nav',navItems);

module.exports = router;