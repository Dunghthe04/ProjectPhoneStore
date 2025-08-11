module.exports=(objectPagination,query,countNumberDocuments)=>{
  //lấy page trên url
  const page=query.page;
  if(page){
    objectPagination.currentPage=parseInt(query.page);
  }
  //setup xem loại bỏ bnhieu ptu
  objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limit;
  //setup xem có tổng cộng bao nhiêu trang
  objectPagination.totalPage=Math.ceil(countNumberDocuments/objectPagination.limit);
  
  //mục tiêu nhận vào các giá trị cần thiết -> sau đó trả về object đã chỉnh sửa(thêm các skip, totalPage,..)
  return objectPagination
}