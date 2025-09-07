const Cart = require('../../models/carts.model')

module.exports.cart=async(req,res,next)=>{
  //kiểm tra xem trong cookie có cartId chưa
  if(!req.cookies.cartId){
    //nếu chưa có thì tạo 1 cart trong database, set time hết hạn 1 năm
    const cart=new Cart();
    await cart.save()

    const expiredTime=1000*60*60*24*365
    res.cookie("cartId",cart.id,{ expires: new Date(Date.now() + expiredTime) })
  }
  next();
}