const User = require('../../models/user.model')
var md5 = require('md5');
module.exports.register=(req,res)=>{
    res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  })
}
module.exports.registerPost=async(req,res)=>{
    const emailExist=await User.findOne({email: req.body.email})

    if(emailExist){
        req.flash("error","Email đã tồn tại!!!")
        res.redirect(req.get("referer"))
        return
    }
    req.body.password=md5(req.body.password)
    const user=new User(req.body);
    user.save();
    res.cookie("userToken",user.userToken)
    res.redirect('/')
}


module.exports.login=async(req,res)=>{
    res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  })
}



module.exports.loginPost=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const user=await User.findOne({email: email, deleted:false})
    if(!user){
        req.flash("error","Email không tồn tại")
        res.redirect(req.get("referer"))
    }
    if(md5(password)!=user.password){
        req.flash("error","Mật khẩu không chính xác")
        res.redirect(req.get("referer"))
    }
    if(user.status=="inactive"){
        req.flash("error","tài khoản đang bị khóa")
        res.redirect(req.get("referer"))
    }
    //gán cookie lên
    res.cookie("userToken",user.userToken);
    res.redirect("/")
}
module.exports.logout=async(req,res)=>{
    res.clearCookie("userToken");
    res.redirect("/user/login")
}
