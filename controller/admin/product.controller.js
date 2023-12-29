const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper");


module.exports.index = async (req, res) => {
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
    
    const products = await Product.find(find);
    //console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang tong quan san pham",
        products: products,
        filterState: filterState,
        keyword: req.query.keyword
    });
};