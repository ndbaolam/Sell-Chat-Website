const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");

//[GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        //Filter
        const filterState = filterStateHelper(req.query);
        //End Filter

        const find = {
            deleted: false,
        }

        if(req.query.status){
            find.status = req.query.status;
        }

        //Search
        if(req.query.keyword){
            const regex = new RegExp(req.query.keyword, "i");
            find.title = regex;
        }
        //End Search
        
        //Pagination
        const countProducts = await Product.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countProducts);
        //End Pagination

        const products = await Product.find(find)
            .sort({
                position: "desc"
            })
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Trang tong quan san pham",
            products: products,
            filterState: filterState,
            keyword: req.query.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
};

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({
        _id: id,
    }, {
        status: status
    });

    req.flash('success', 'Cập nhật trạng thái thành công!');

    res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
      const id = req.params.id;
  
      // await Product.deleteOne({
      //   _id: id
      // });
  
      await Product.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      req.flash('success', 'Xoá Sản phẩm thành công!');
    } catch (error) {
      console.log(error);
    }
  
    res.redirect("back");
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "inactive":
        case "active":
            await Product.updateMany({
                _id: { $in: ids }
                //Tìm ra các _id có ở bên trong mảng ids
            }, {
                status: type
            });

            req.flash('success', 'Cập nhật trạng thái thành công!');
            break;
            
        case "delete-all":
            await Product.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true,
                deletedAt: new Date()
            });

            req.flash('success', 'Xoá Sản phẩm thành công!');
            break;

        default: 
            break;
    }

    res.redirect("back");
}

//[GET] /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create.pug");
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position  == ""){
        req.body.position = await Product.countDocuments() + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if(req.file && req.file.filename){
        req.body.thumbnail = `/uploads/${ req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Thêm mới sản phẩm thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/products/`);
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            deleted: false
        });
    
        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        if(req.body.position  == ""){
            req.body.position = await Product.countDocuments() + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
    
        if(req.file && req.file.filename){
            req.body.thumbnail = `/uploads/${ req.file.filename}`;
        }
    
        await Product.updateOne({
            _id: id,
            deleted: false
        }, req.body);
    
        req.flash("success", "Cập nhật sản phẩm thành công!");
    
        res.redirect(`/${systemConfig.prefixAdmin}/products/`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products/`);
    }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
      const id = req.params.id;
  
      const product = await Product.findOne({
        _id: id,
        deleted: false
      });
  
      console.log(product);
  
      res.render("admin/pages/products/detail", {
        pageTitle: "Chi tiết sản phẩm",
        product: product
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
};

//[GET] /admin/product/recover
module.exports.recover = async (req, res) => {
    try {
        //Filter
        const filterState = filterStateHelper(req.query);
        //End Filter

        const find = {
            deleted: true,
        }

        if(req.query.status){
            find.status = req.query.status;
        }

        //Search
        if(req.query.keyword){
            const regex = new RegExp(req.query.keyword, "i");
            find.title = regex;
        }
        //End Search
        
        //Pagination
        const countProducts = await Product.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countProducts);
        //End Pagination

        const products = await Product.find(find)
            .sort({
                position: "desc"
            })
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

        res.render("admin/pages/products/recover.pug", {
            pageTitle: "Trang khôi phục sản phẩm",
            products: products,
            filterState: filterState,
            keyword: req.query.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
};

//[PATCH] /admin/products/recover/:id
module.exports.recoverPatch = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id,
    }, {
        deleted: false
    });

    req.flash('success', 'Khôi phục sản phẩm thành công!');

    res.redirect("back");
}

// [DELETE] /admin/products/recover/:id
module.exports.deletePermanent = async (req, res) => {
    try {
      const id = req.params.id;
  
      await Product.deleteOne({
        _id: id
      });
      req.flash('success', 'Đã xoá vĩnh viễn sản phẩm');
    } catch (error) {
      console.log(error);
    }
    res.redirect("back");
  }