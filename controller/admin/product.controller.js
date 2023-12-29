const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const filterState = [
        {
          name: "Tất cả",
          status: "",
          class: ""
        },
        {
          name: "Hoạt động",
          status: "active",
          class: ""
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
          class: ""
        }
    ];

    if(req.query.status){
        const index = filterState.findIndex(item => item.status == req.query.status);
        filterState[index].class = "active";
    } else {
        filterState[0].class = "active";
    }

    const find = {
        deleted: false,
    }

    if(req.query.status){
        find.status = req.query.status;
    }

    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }

    const products = await Product.find(find);
    //console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang tong quan san pham",
        products: products,
        filterState: filterState,
        keyword: req.query.keyword
    });
};