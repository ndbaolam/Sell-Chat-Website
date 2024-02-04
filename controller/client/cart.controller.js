const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

//[POST] /add/:productId
module.exports.addPost = async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    try {
        const cart = await Cart.findOne({
            _id: cartId
        });

        const existProductInCart = cart.products
            .find(item => item.product_id == productId);

        if(!existProductInCart){
            const objectCart = {
                product_id: productId,
                quantity: quantity
            };

            await Cart.updateOne({
                _id: cartId
            }, {
                $push: { products: objectCart },
            });
        } else {
            const newQuantity = existProductInCart.quantity + quantity;

            await Cart.updateOne({
                _id: cartId,
                "products.product_id": productId
            }, { 
                $set: { "products.$.quantity": newQuantity }
            });
        }

        req.flash('success', 'Đã thêm vào giỏ hàng thành công!');
    } catch (error) {
        req.flash('error', 'Đã thêm vào giỏ hàng thất bại!');
    }

    res.redirect('back');
}

//[GET] /cart/
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    });

    cart.totalPrice = 0;

    if(cart.products.length > 0) {
        for (const item of cart.products) {
            const product = await Product.findOne({
                _id: item.product_id
            }).select("thumbnail title slug price discountPercentage");
        
            product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
        
            item.productInfo = product;
        
            item.totalPrice = item.quantity * product.priceNew;
        
            cart.totalPrice += item.totalPrice;
        }
    }
        
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
};

module.exports.delete = async (req, res) => {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    await Cart.updateOne({
        _id: cartId,
    }, {
        $pull: {products: {product_id : productId}}
    });

    req.flash('success', 'Đã xóa sản phẩm khỏi giỏ hàng!');
    
    res.redirect('back');
}