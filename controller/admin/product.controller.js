const products=require('../../models/product.model')
module.exports.index=async(req,res)=>{
  const productList=await products.find({
     deleted: false
  }) 
  console.log(productList);
  
  res.render('admin/pages/products/index',{
    pageTitle: "Danh sach san pham",
    products: productList
  })
}