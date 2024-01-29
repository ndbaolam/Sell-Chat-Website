const ProductCategory = require('../../models/product-category.model');
const createTreeeHelper = require('../../helpers/create-tree.helper');

module.exports.category = async (req, res, next) => {
    const categoryProducts = await ProductCategory.find({
        deleted: false,
    });

    const newCategoryProducts = createTreeeHelper(categoryProducts);

    res.locals.layoutCategoryProducts = newCategoryProducts;

    next();
};