const products=require('../../models/product.model')
module.exports.index=async(req,res)=>{
  
  //các nút (tất cả, active, inactive, truyền sang view)
  let filterStatus=[
    {name: "Tất cả",
     status: "",
     class: "" 
    },
    {name: "Hoạt động",
     status: "active",
     class: "" 
    },
    {name: "Dừng hoạt động",
     status: "inactive",
     class: "" 
    }
  ]
  //sử lý xanh nút khi ấn(3)
  if(req.query.status){
    //tìm xem nút nào có status trùng với url -> cho xanh (thêm class active)
    const index =filterStatus.findIndex(item => item.status==req.query.status);
    filterStatus[index].class="active";
  }else{
    //nếu là ""(mặc định -> tìm cái "" rồi cho
    const index=filterStatus.findIndex(item => item.status=="");
    filterStatus[index].class="active";
  }

  //lọc
  const find={
    deleted: false
  }
  //lấy status trên url(2)
  if(req.query.status){
    find.status=req.query.status;
  }

  const productList=await products.find(find) 
  
  res.render('admin/pages/products/index',{
    pageTitle: "Danh sach san pham",
    products: productList,
    filterButtons: filterStatus
  })
}