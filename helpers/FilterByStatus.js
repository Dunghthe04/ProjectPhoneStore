module.exports=(query)=>{
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
  if(query.status){
    //tìm xem nút nào có status trùng với url -> cho xanh (thêm class active)
    const index =filterStatus.findIndex(item => item.status==query.status);
    filterStatus[index].class="active";
  }else{
    //nếu là ""(mặc định -> tìm cái "" rồi cho
    const index=filterStatus.findIndex(item => item.status=="");
    filterStatus[index].class="active";
  }

  //mục đích cuối cùng của nó là trả về mảng các nút, và thêm active nào nút ấn
  return filterStatus
}