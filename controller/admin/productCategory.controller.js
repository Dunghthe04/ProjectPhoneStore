const productCategory = require('../../models/productCategory.model')
const config = require("../../config/system")
module.exports.index =async (req, res) => {
    const find={
        deleted: false
    }
    const record=await productCategory.find(find)
    res.render('admin/pages/product-category/index.pug', {
        pageTitle: "Trang danh mục sản phẩm",
        record: record
    })
}

module.exports.create = (req, res) => {
    res.render('admin/pages/product-category/create.pug', {
        pageTitle: "Trang tạo danh mục sản phẩm "
    })
}

module.exports.createProductCategory = async (req, res) => {
    //nếu k nhập postion -> đếm rồi +1 
    if (req.body.position === "") {
        const numberOfProduct = await productCategory.countDocuments();
        req.body.position = numberOfProduct + 1;
    } else {
        req.body.position = req.body.position;
    }
     


    //tạo product với thông tin trong req.body, rồi lưu vào database
    const product_Category = new productCategory(req.body);
    await product_Category.save();

    req.flash("success", "Thêm danh mục sản phẩm")
    res.redirect(`${config.PrefixAdmin}/product-category`)
}