const ProductCategory = require('../../models/productCategory.model')
const Product = require('../../models/product.model')
const Account = require('../../models/accounts.model')
const User = require('../../models/user.model')
module.exports.index = async(req, res) => {
    const statistic={
        categoryProduct:{
            total:0,
            active:0,
            inactive:0
        },
        product :{
            total:0,
            active:0,
            inactive:0
        },
         account:{
            total:0,
            active:0,
            inactive:0
        },
         user:{
            total:0,
            active:0,
            inactive:0
        }
    }
    statistic.categoryProduct.total=await ProductCategory.countDocuments()
    statistic.categoryProduct.active=await ProductCategory.find({deleted: false,status:"active"}).countDocuments()
    statistic.categoryProduct.inactive=await ProductCategory.find({deleted: false,status:"inactive"}).countDocuments()

    statistic.product.total=await Product.countDocuments()
    statistic.product.active=await Product.find({deleted: false,status:"active"}).countDocuments()
    statistic.product.inactive=await Product.find({deleted: false,status:"inactive"}).countDocuments()

    statistic.account.total=await Account.countDocuments()
    statistic.account.active=await Account.find({deleted: false,status:"active"}).countDocuments()
    statistic.account.inactive=await Account.find({deleted: false,status:"inactive"}).countDocuments()

    statistic.user.total=await User.countDocuments().countDocuments()
    statistic.user.active=await User.find({deleted: false,status:"active"}).countDocuments()
    statistic.user.inactive=await User.find({deleted: false,status:"inactive"}).countDocuments()

    if (res.locals.roleAccount.permissions.length > 0) {
        res.render('admin/pages/dashboard/index.pug', {
            pageTitle: "Trang Chu Admin",
            statistic:statistic
        })
    } else {
        res.send("không có quyền")
    }
}