const Product=require('../../models/product.model')
//index
module.exports.index=async(req,res)=>{
    const products=await Product.find({
        status:"active",
        deleted:false
    }).sort({position: "desc"});


   const newProducts=products.map(item=>{
     item.newPrice=(item.price - (item.price*(item.discountPercentage/100))).toFixed(0);
     return item;
   })
    res.render("client/pages/products/index",{
        pageTitle: "Trang danhs sach san pham",
        products: newProducts 
    })
}

//detail
module.exports.detail=async(req,res)=>{
    try {
        const find={
            status:"active",
            slug: req.params.slug,
            deleted: false
        }
        const product=await Product.findOne(find);
        if(product){
          res.render('client/pages/products/detail.pug',{
            pageTitle: "Chi tiết sản phẩm",
            product: product
          })
        }else{
          res.redirect("/products")
        }
    } catch (error) {
        res.redirect("/products")
    }
}