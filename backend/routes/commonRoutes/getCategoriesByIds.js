const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const categoriesIds = req.query.ids;
        if (!Array.isArray(categoriesIds)) {
            return res.status(400).json({ message: 'ids is not an array ' });
        }
        console.log('Get query to get categories by ids');
        const categories = await Category.find({ _id: { $in: categoriesIds } }).lean();
        for (let i = 0; i < categories.length; i++) {
            categories[i].handledSubcategories = [];
            if (categories[i].subcategories.length !== 0) {
                for (let j = 0; j < categories[i].subcategories.length; j++) {
                    const subcategory = await Category.findById(categories[i].subcategories[j]);
                    categories[i].handledSubcategories.push(subcategory);
                }
            }
        }
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
