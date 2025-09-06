const Product=require('../../models/product.model')
const newPriceHelper=require('../../helpers/newPriceProduct')
module.exports.index=async(req,res)=>{
    // lấy ra sản phẩm nổi bật
    const findFeatureProduct={
       deleted:false,
       status:"active",
       featured:"1"
    }

    //lấy ra sản phẩm mới nhất
    const findNewProduct={
       deleted:false,
       status:"active",
    }

    const featureProuct=await Product.find(findFeatureProduct)
    const priceProductFeature=newPriceHelper.newPriceArray(featureProuct)

    const newProduct=await Product.find(findNewProduct).sort({position:"desc"}).limit(8)
    const priceNewProduct=newPriceHelper.newPriceArray(newProduct)

    res.render("client/pages/home/index",{
        pageTitle: "Sản phẩm nổi bật",
        featureProuct:priceProductFeature,
        newProduct:priceNewProduct
    })
}