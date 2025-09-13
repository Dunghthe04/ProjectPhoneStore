
const Cart=require('../../models/carts.model')
const Product=require('../../models/product.model')
const Order=require('../../models/order.model')
const newPriceHelper=require('../../helpers/newPriceProduct')

//index
module.exports.index=async(req,res)=>{
    //lây cartId
    const cartId=req.cookies.cartId;
    //từ id -> lấy cart
    const cart=await Cart.findOne({_id: cartId})
    //duyệt qua từng sản phẩm trong mảng products của cart để lấy thông tin
    if(cart.products.length>0){
        for(const item of cart.products){ 
        //lấy ra thông tin của từng sản phẩm
        const productInfo=await Product.findOne({_id: item.product_id}).select("title thumbnail slug price discountPercentage")
        //tạo giá mới cho sp
        productInfo.newPrice=newPriceHelper.newPrice(productInfo)
        //lưu thông tin đó vào object
        item.productInfo=productInfo
        //tính tổng tiền của 1 object đó
        item.totalPrice=productInfo.newPrice*item.quantity
        console.log(item.productInfo);
      }
    }

    //tổng tiền của cart
    cart.totalPriceCart=cart.products.reduce((sum,item)=> sum+item.totalPrice,0)
    res.render("client/pages/checkout/index.pug",{
        pageTitle: "Đặt hàng",
        cartDetail:cart
    })
}

//order
module.exports.order=async(req,res)=>{
    //lấy 3 thông tin carid, userInfor, product lưu vào db
    const cartId=req.cookies.cartId;
    const userInfor=req.body;//(1)userInfor (req.body trả về object đủ thông tin userinfor)
    const products=[];//(2) object chứa các sp
    
    const cart=await Cart.findOne({_id: cartId});
    //duyệt qua từng ptu mảng products
    for(const item of cart.products){
        //tạo 1 object sp để cho vào mảng
        const objectProduct= {
            product_id: item.product_id,
            price:0,
            discountPercentage: 0,
            quantity:item.quantity
        }
        //lấy ra chi tiết sp để điền nốt 2 thông tin
        const productDetail=await Product.findOne({_id: item.product_id}).select("price discountPercentage")
        //cập nhập object
        objectProduct.price=productDetail.price
        objectProduct.discountPercentage=productDetail.discountPercentage
        //push từng sp vào mảng sp
        products.push(objectProduct)
    }
    //tạo object cho model
    const orderInfor={
        cartId:cartId,
        userInfo:userInfor,
        products:products
    }
    //tạo model
    const order=new Order(orderInfor)
    order.save();
    res.redirect(`/checkout/success/${order.id}`);
}

//success
module.exports.successOrder=async(req,res)=>{
    res.render("client/pages/checkout/success.pug",{
        pageTitle: "Đặt hàng thành công",
    })
}
