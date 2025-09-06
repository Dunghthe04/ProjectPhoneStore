module.exports.index=(req,res)=>{
    if (res.locals.roleAccount.permissions.length>0) {
  res.render('admin/pages/dashboard/index.pug',{
        pageTitle: "Trang Chu Admin"
    })
    }else{
         res.send("không có quyền")
    }
}