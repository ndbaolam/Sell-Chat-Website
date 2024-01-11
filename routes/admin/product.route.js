const express = require("express");
const router = express.Router();
const multer  = require('multer');

const storageMulter = require("../../helpers/storage-multer.helper");

const upload = multer({ storage: storageMulter() });

const controller = require("../../controller/admin/product.controller");

const validate = require("../../validates/product.validate");

router.get("/", controller.index);

router.patch(
    "/change-status/:status/:id", 
    controller.changeStatus
);

router.delete(
    "/delete/:id", 
    controller.deleteItem
);

router.patch(
    "/change-multi", 
    controller.changeMulti
);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

module.exports = router;