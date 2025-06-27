const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/navItems/itemsController');
const categoriesController = require('../controllers/navItems/categoriesController');
const marqueController = require('../controllers/navItems/marqueController')


router.get('/items', itemsController.getNavItems);
router.get('/items/ref', itemsController.getNavRefs);
router.get('/items/:ref', itemsController.getNavItemsByRef);

router.get('/categories', categoriesController.getNavCategories);
router.get('/categories/:category', categoriesController.getNavSubCategoriesByCategory);

router.get('/marque', marqueController.getNavMarques);

module.exports = router;