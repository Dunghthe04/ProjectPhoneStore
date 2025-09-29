const User = require('../../models/user.model')
module.exports.inforUser=async(req,res,next)=>{
  //nếu có đăng nhập -> có token thì đăng nhập và trả thông tin ng dùng, còn ko có vẫn cho next vẫn cho xem trang chủ
  if(req.cookies.userToken){
    const user=await User.findOne(
        {userToken: req.cookies.userToken,
         status: "active",
         deleted:false   
         });
    if(user){
        res.locals.user=user;
        console.log(user);
        
    }     
  }
  next();
}