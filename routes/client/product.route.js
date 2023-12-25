const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("client/pages/product/index.pug");
});

// router.get("/detail", (req, res) => {
//     res.send("Chi tiet san pham");
// });

// router.get("/edit", (req, res) => {
    
// });

module.exports = router;