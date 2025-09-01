const { PrefixAdmin } = require('../../config/system');
const Account = require('../../models/accounts.model');
var md5 = require('md5');
module.exports.login=(req,res)=>{
    res.render('admin/pages/auth/login.pug',{
        pageTitle: "Trang đăng nhập"
    })
}
module.exports.loginPost=async(req,res)=>{
    const email=req.body.email
    const pass=req.body.password

    //lấy ra tài khoản
    const account=await Account.findOne({email: email, deleted: false})

    //nếu ko có -> chuyển đến đăng nhập
    if(!account){
        req.flash("error","Tài khoản không tồn tại")
        res.redirect(req.get("referer"))
        return;
    }

    //kiểm tra xem đúng mật khẩu k
    if(md5(pass)!=account.password){
        req.flash("error","Mật khẩu chưa chính xác")
        res.redirect(req.get("referer"))
        return;
    }

    //kiểm tra xem tài khoản bị khóa hay k
    if(account.status=="inactive"){
        req.flash("error","Tài khoản bị khóa")
        res.redirect(req.get("referer"))
        return;
    }
    //nếu đúng hết -> chuyển dashboard , và lưu token của account vào cookie
    res.cookie("token",account.token);
    res.redirect(`${PrefixAdmin}/dashboard`)
}

module.exports.logout=(req,res)=>{
    res.clearCookie("token");
    res.redirect(`${PrefixAdmin}/auth/login`)
}