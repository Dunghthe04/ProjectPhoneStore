const products=require('../../models/product.model')
const filterHelper=require('../../helpers/FilterByStatus')
const searchHelper=require('../../helpers/searchByKeyword')
module.exports.index=async(req,res)=>{

  //Tối ưu các nút search by status
  const filterStatus=filterHelper(req.query);
  console.log(filterStatus);
  
  //lọc
  const find={
    deleted: false
  }
  //lấy status trên url(2) và gán vô find
  if(req.query.status){
    find.status=req.query.status;
  }
   
  //Tối ưu search keyword
  const objectSearch=searchHelper(req.query);
  //lấy regex và gán vô find
  if(objectSearch.regex){
    find.title=objectSearch.regex
  }
  
  const productList=await products.find(find) 
  
  res.render('admin/pages/products/index',{
    pageTitle: "Danh sach san pham",
    products: productList,
    filterButtons: filterStatus,
    keywordSearch: objectSearch.keyword
  })
}