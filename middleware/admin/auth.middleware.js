// trang check token
const Account=require("../../models/accounts.model")
const config=require("../../config/system")
module.exports.requireAuth=async(req,res,next)=>{
    //nếu chưa có token -> sang trang login
    if(!req.cookies.token){
        res.redirect(`${config.PrefixAdmin}/auth/login`)
    }else{
        //nếu có token r , ktra xem token đó có hợp lệ không
        const account=await Account.find({token: res.cookie.token})
        //nếu ko tman
        if(!account){
          res.redirect(`${config.PrefixAdmin}/auth/login`)
        }else{
            next();
        }
    }
}