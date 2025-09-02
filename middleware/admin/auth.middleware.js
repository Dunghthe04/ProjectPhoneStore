// trang check token
const Account=require("../../models/accounts.model")
const Role=require("../../models/roles.model")
const config=require("../../config/system")
module.exports.requireAuth=async(req,res,next)=>{
    //nếu chưa có token -> sang trang login
    if(!req.cookies.token){
        res.redirect(`${config.PrefixAdmin}/auth/login`)
    }else{
        //nếu có token r , ktra xem token đó có hợp lệ không
        const account=await Account.findOne({token: req.cookies.token}).select("-password")
        //nếu ko tman
        if(!account){
          res.redirect(`${config.PrefixAdmin}/auth/login`)
        }else{
            //nếu thỏa mãn -> trả về thông tin user và các quyền của tài khoản đó để check authen
            const role=await Role.findOne({_id: account.role_id})
            console.log(role);
            
            res.locals.account=account;
            res.locals.roleAccount=role;
            next();
        }
    }
}