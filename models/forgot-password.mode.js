//tạo ra để lưu otp, expireAt sẽ xóa bản ghi dựa vào thời gian
const mongoose = require('mongoose')
const forgotPasswordSchema = mongoose.Schema(
    {
    email:String,
    otp: String,
    expireAt: {
        type:Date,
        expires:10
    }
},{timestamps: true})

const forgotPassword=mongoose.model("ForgotPassword",forgotPasswordSchema,"forgot-password");
module.exports=forgotPassword;