const express = require('express');

const router = express.Router();

const navItems = require('./navItemsRouter');

router.use('/nav',navItems);

module.exports = router;