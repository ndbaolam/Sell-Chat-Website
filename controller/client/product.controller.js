const Product = require("../../models/product.model");

//[GET] /products/
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    for (const item of products) {
        item.newPrice = item.price * (1 - item.discountPercentage / 100);
        item.newPrice = item.newPrice.toFixed(0);
    }

    //console.log(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: products
    });
}

//[GET] /products/detail
module.exports.detail =  (req, res) => {
    res.send("Chi tiet san pham");
}

//[GET] /products/edit
module.exports.edit = (req, res) => {
    res.send("Chinh sua san pham");
};