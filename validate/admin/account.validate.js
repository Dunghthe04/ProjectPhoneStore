module.exports.createAccount=(req,res,next)=>{
    if(!req.body.fullname){
        req.flash("error","Tên không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    if(!req.body.email){
        req.flash("error","Email không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    if(!req.body.password){
        req.flash("error","Mật khẩu không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}

module.exports.editAccountPatch=(req,res,next)=>{
    if(!req.body.fullname){
        req.flash("error","Tên không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    if(!req.body.email){
        req.flash("error","Email không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}