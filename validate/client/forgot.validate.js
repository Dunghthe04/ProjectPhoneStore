module.exports.forgot=(req,res,next)=>{
    if(!req.body.email){
        req.flash("error","Email không được để trống");
        res.redirect(req.get("referer"));
        return;
    }
    next();// next sang buoc tiep theo
}