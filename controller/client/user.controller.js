const User = require('../../models/user.model')
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
    const user=new User(req.body);
    user.save();
    res.cookie("userToken",user.token)
    res.redirect('/')
}