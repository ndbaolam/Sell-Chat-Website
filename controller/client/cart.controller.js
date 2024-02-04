const Cart = require('../../models/cart.model');

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