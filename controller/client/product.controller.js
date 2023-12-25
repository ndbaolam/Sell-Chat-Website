//[GET] /products/
module.exports.index = (req, res) => {
    res.render("client/pages/product/index.pug");
}

//[GET] /products/detail
module.exports.detail =  (req, res) => {
    res.send("Chi tiet san pham");
}

//[GET] /products/edit
module.exports.edit = (req, res) => {
    res.send("Chinh sua san pham");
};