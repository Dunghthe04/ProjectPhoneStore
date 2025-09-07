const Product = require('../../models/product.model')
const getNewPriceHelper = require('../../helpers/newPriceProduct')
//lấy ra keyword và trả vê mảng product
module.exports.index = async (req, res) => {
  let keyword=""
  if(req.query.keyword){
    keyword=req.query.keyword
  }
  const regex=new RegExp(keyword,"i");
  let products=await Product.find({
    deleted: false,
    status:"active",
    title: regex
  }) 


  //set giá new
  products=getNewPriceHelper.newPriceArray(products)
  
  res.render("client/pages/search/index", {
    pageTitle: "Tìm kiếm sản phẩm",
    products:products,
    keyword:keyword
  })
}