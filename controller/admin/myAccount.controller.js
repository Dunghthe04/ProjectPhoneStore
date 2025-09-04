const Account = require('../../models/accounts.model');
var md5 = require('md5');
module.exports.index=(req,res)=>{
    res.render('admin/pages/my-account/index.pug',{
        pageTitle: "Thông tin tài khoản"
    })
}
module.exports.edit=(req,res)=>{
    res.render('admin/pages/my-account/edit.pug',{
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    })
}
module.exports.editPatch=async(req,res)=>{
    const id=res.locals.account.id;
    //kiểm tra xem email tồn tại ko ( ngoại trừ email tkhoan htai)
    const existEmail=await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    })

    if(existEmail){
        req.flash("error","Email đã tồn tại")
        res.redirect(req.get("referer"))
    }else{
        //Mã hóa mật khẩu mới nếu có
        if(req.body.password){
            req.body.password=md5(req.body.password)
        }else{
            delete req.body.password;
        }
        await Account.updateOne({_id: id},req.body)
        req.flash("success","Cập nhập tài khoản thành công")
    }
    res.redirect(req.get("referer"))
}

  