//[GET] /products/
module.exports.index = (req, res) => {
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham"
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