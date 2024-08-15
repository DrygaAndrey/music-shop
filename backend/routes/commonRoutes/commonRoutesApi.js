// server/routes/api.js
const express = require('express');
const router = express.Router();
const getMainCategories = require('./getMainCategories');
const getProductsByIds = require('./getProductsByIds');
const getNewProducts = require('./getNewProducts');
const checkProductOrCategory = require('./checkProductOrCategory');
const getBreadCrumps = require('./getBreadCrumps');
const getAllPossiblePaths = require('./getAllPossiblePaths');
const getCategoryByTitle = require('./getCategoryByTitle');
const getCategoriesByIds = require('./getCategoriesByIds');

router.use('/getMainCategories', getMainCategories);
router.use('/getProductsByIds', getProductsByIds);
router.use('/getNewProducts', getNewProducts);
router.use('/checkProductOrCategory', checkProductOrCategory);
router.use('/getBreadCrumps', getBreadCrumps);
router.use('/getAllPossiblePaths', getAllPossiblePaths);
router.use('/getCategoryByTitle', getCategoryByTitle);
router.use('/getCategoriesByIds', getCategoriesByIds);

module.exports = router;