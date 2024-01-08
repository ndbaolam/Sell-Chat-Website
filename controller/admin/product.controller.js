const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");

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

//[GET] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({
        _id: id,
    }, {
        status: status
    });

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
    } catch (error) {
      console.log(error);
    }
  
    res.redirect("back");
}

//[GET] /admin/product/change-multi
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
            break;
            
        case "delete-all":
            await Product.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            break;

        default: 
            break;
    }

    res.redirect("back");
}