const products=require('../../models/product.model')
const filterHelper=require('../../helpers/FilterByStatus')
const searchHelper=require('../../helpers/searchByKeyword')
const paginationHelper=require('../../helpers/pagination')
module.exports.index=async(req,res)=>{

  //Tối ưu các nút search by status
  const filterStatus=filterHelper(req.query);
  
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

  //Pagination
  const countNumberDocuments=await products.countDocuments(find);
  //tối ưu pagination(mục tiêu truyền vào các data cần thiết và trả về object sau khi thao tác)
  const objectPagination=paginationHelper({
    currentPage:1,
    limit:5
  },req.query,countNumberDocuments)

  
  const productList=await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip) 
  
  res.render('admin/pages/products/index',{
    pageTitle: "Danh sach san pham",
    products: productList,
    filterButtons: filterStatus,
    keywordSearch: objectSearch.keyword,
    objectPagination: objectPagination
  })
}