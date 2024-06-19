// server/routes/api.js
const express = require('express');
const router = express.Router();

const adminLogin = require('./adminLoginRouter');
const checkToken = require('./checkToken');
const addCategory = require('./addCategoryRouter');
const getAllCategories = require('./getAllCategories');
const adminLogout = require('./adminLogoutRouter');

router.use('/login', adminLogin);
router.use('/logout', adminLogout);
router.use('/checkToken', checkToken);
router.use('/addCategory', addCategory);
router.use('/getAllCategories', getAllCategories);

module.exports = router;