const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    res.render("admin/pages/products-category/index", {
      pageTitle: "Danh mục sản phẩm"
    });
};

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo mới danh mục"
    });
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position  == ""){
        req.body.position = await ProductCategory.countDocuments() + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if(req.file && req.file.filename){
        req.body.thumbnail = `/uploads/${ req.file.filename}`;
    }

    const record = new ProductCategory(req.body);
    await record.save();

    req.flash("success", "Thêm mới danh mục sản phẩm thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/products-category/`);
}