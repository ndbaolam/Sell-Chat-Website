const express = require("express");
const router = express.Router();

//Upload image
const multer  = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
//End upload image

//const storageMulter = require("../../helpers/storage-multer.helper");

const upload = multer();

const controller = require("../../controller/admin/product.controller");

const validate = require("../../validates/admin/product.validate");

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
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

//Recover Page
router.get("/recover", controller.recover);
router.patch("/recover/:id", controller.recoverPatch);
router.delete("/recover/:id", controller.deletePermanent);
//End recover page

module.exports = router;