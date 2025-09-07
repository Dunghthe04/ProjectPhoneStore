
const Cart=require('../../models/carts.model')
const newPriceHelper=require('../../helpers/newPriceProduct')
module.exports.addPost=async(req,res)=>{
    const cartId=req.cookies.cartId;
    const quantity=parseInt(req.body.quantity);
    const productId=req.params.productId


    //lấy ra cart dựa trên id
    const cart=await Cart.findOne({_id:cartId})

    //kiểm tra xem có sản phẩm đó trong cart chưa dựa trên productId
    const productsInCart=cart.products.find(item=> item.product_id==productId)// dùng js find , tìm trong mảng product xem xem có sản phẩm nào(object) có id trung k

    if(productsInCart){
        //nếu có rồi -> cập nhập số lượng thôi
        const newQuantity=quantity+productsInCart.quantity;
        //update sản phẩm cart nào, của sản phẩm nào, và update cái gì
        await Cart.updateOne(
            {
                _id: cartId,// có cartId =id
                "products.product_id": productId// có productid=id
            },
            {$set : {"products.$.quantity": newQuantity}}
        )
    }else{
        //nếu chưa có -> push thêm sản phẩm đó vào mảng sản phẩm
        const newOnjectproduct={
            product_id:productId,
            quantity:quantity
        }
        await Cart.updateOne({_id: cartId},{$push : {products: newOnjectproduct}})
    }
    req.flash("success","Thêm sản phẩm vào giỏ hàng thành công")
    res.redirect(req.get("referer"))
    
}