const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree.helper");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/products-category/index", {
      pageTitle: "Danh mục sản phẩm",   
        records: records
    });
};

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    });

    const newRecords = createTreeHelper(records);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo mới danh mục",
        records: newRecords
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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
      const data = await ProductCategory.findOne({
        _id: req.params.id,
        deleted: false
      });
  
      console.log(data);
  
      const records = await ProductCategory.find({
        deleted: false,
      });
  
      const newRecords = createTreeHelper(records);
  
      res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
  };

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        if(req.body.position  == ""){
            req.body.position = await ProductCategory.countDocuments() + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
    
        if(req.file && req.file.filename){
            req.body.thumbnail = `/uploads/${ req.file.filename}`;
        }
    
        await ProductCategory.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body);
    
        req.flash("success", "Cập nhật danh mục sản phẩm thành công!");
    
        res.redirect('back');
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category/`);
    }
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    try {  
      const products = await Product.find({
        product_category_id: req.params.id,
        deleted: false
      });

      const productCategory = await ProductCategory.findOne({
        _id: req.params.id,
        deleted: false
      })

      res.render("admin/pages/products-category/detail", {
        pageTitle: "Chi tiết sản phẩm",
        products: products,
        productCategory: productCategory
      });

    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
};