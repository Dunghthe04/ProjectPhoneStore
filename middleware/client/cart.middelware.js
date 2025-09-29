const Cart = require('../../models/carts.model')

module.exports.cart = async (req, res, next) => {
  //kiểm tra xem trong cookie có cartId chưa
  let cart;
  if (!req.cookies.cartId) {
    //nếu chưa có thì tạo 1 cart trong database, set time hết hạn 1 năm
    cart = new Cart();
    await cart.save()

    const expiredTime = 1000 * 60 * 60 * 24 * 365
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiredTime)
    })
  } else {
    //nếu có cart rồi lấy ra thôi
    const cartId = req.cookies.cartId;
    cart = await Cart.findOne({
      _id: cartId
    })

  }
  const numberProductInCart = cart.products.reduce((count, item) => count + item.quantity, 0)
  cart.quantityProduct = numberProductInCart
  res.locals.cart = cart
  next();
}