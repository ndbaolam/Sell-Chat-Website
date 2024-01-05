const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/trash.controller");

router.get("/", controller.index);

router.patch(
    "/:id",
    controller.recoverItem
);

module.exports = router;