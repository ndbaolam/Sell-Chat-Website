const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const md5 = require('md5');
const systemConfig = require("../../config/system");
const generateHelper = require("../../helpers/generate.helper");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
    // Find
    let find = {
        deleted: false,
    };
    // End Find

    const records = await Account.find(find);

    for (const record of records) {
        const role = await Role.findOne({
          _id: record.role_id
        });
        record.role = role;
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
    });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {

    req.body.token = generateHelper.generateRandomString(30);
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
};

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false,
        });
    
        const roles = await Role.find({
            deleted: false,
        });
    
        res.render('admin/pages/accounts/edit',{
            pageTitle: "Chỉnh sửa sản phẩm",
            data: data,
            roles: roles
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }    
}