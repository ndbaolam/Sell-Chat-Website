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
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

        res.render("admin/pages/trash-items/index.pug", {
            pageTitle: "Danh sách sản phẩm đã xoá",
            products: products,
            filterState: filterState,
            keyword: req.query.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/${systemConfig.prefixAdmin}/trash-items`);
    }
};

module.exports.recoverItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id,
    }, {
        deleted: false
    });

    res.redirect("back");
}