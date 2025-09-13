const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    // userId: String,
    cartId:String,
    //thông tin ng dùng muốn thay đổi.. gửi hàng ,...
    userInfo:{
        fullname: String,
        phone:String,
        email: String,
        address:String
    },
    //tuy có carId ta vẫn phải lưu product vì giá phải là lúc mua, % giảm giá lúc mua
    products:[
        {
            product_id: String,
            price:Number,
            discountPercentage: Number,
            quantity:Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{timestamps: true})

const Order=mongoose.model("Order",orderSchema,"order");
module.exports=Order;