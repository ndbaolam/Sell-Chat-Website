const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false,
    }).sort({ position: "desc"}).limit(6);

    for (const item of productsFeatured) {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
    }

    // Sản phẩm mới nhất
    const productsNew = await Product.find({
        status: "active",
        deleted: false,
    }).sort({ position: "desc" }).limit(6);

    for (const item of productsNew) {
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
    }
    // Hết Sản phẩm mới nhất

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chu",
        productsFeatured: productsFeatured,
        productsNew: productsNew
    });
};