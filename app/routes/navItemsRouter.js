const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/navItems/itemsController');
const categoriesController = require('../controllers/navItems/categoriesController');

router.get('/items', itemsController.getNavItems);
router.get('/items/ref', itemsController.getNavRefs);
router.get('/items/:ref', itemsController.getNavItemsByRef);

router.get('/categories', categoriesController.getNavCategories);
router.get('/subcategories', categoriesController.getNavSubCategories);
router.get('/categories/:category', categoriesController.getNavSubCategoriesByCategory);

module.exports = router;