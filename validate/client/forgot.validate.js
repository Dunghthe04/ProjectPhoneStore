module.exports.forgot=(req,res,next)=>{
    if(!req.body.email){
        req.flash("error","Email không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}

module.exports.optEnter=(req,res,next)=>{
    if(!req.body.otp){
        req.flash("error","Mã OTP không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}

module.exports.resetPassword=(req,res,next)=>{
    if(!req.body.password){
        req.flash("error","Mật khẩu không được để trống");
        res.redirect(req.get("referer"));
        return;
    }

    if(!req.body.confirmPassword){
        req.flash("error","Mật khẩu xác minh không được để trống");
        res.redirect(req.get("referer"));
        return;
    }

    if(req.body.confirmPassword != req.body.password){
        req.flash("error","Mật khẩu xác minh không trùng khớp");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}