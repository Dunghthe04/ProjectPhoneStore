const tablePermission=document.querySelector("[table-permission]")
if(tablePermission){
   const btnSubmit=document.querySelector("[button-submitForm]")
   btnSubmit.addEventListener("click",()=>{
      let permission=[];// tạo ra mảng lưu chữ (id, mảng permission chứa các quyền) của từng ptu
      //lấy ra các dòng data-name
      const rows=tablePermission.querySelectorAll("[data-name]");
      console.log(rows);
      
      //duyệt từng dòng có tt data-name(id và các quyền)
      rows.forEach(row=>{
         //lấy ra tên dòng , và all input ở dòng đó
         const rowName=row.getAttribute("data-name");
         const inputRow=row.querySelectorAll("input");
         console.log(rowName);

         //nếu name=id -> tạo 1 ptu gồm (id và mảng permission rỗng) lưu vào permission to
         if(rowName=="id"){
            //lấy ra id của ptu từ ô input
            inputRow.forEach((input)=>{
               const id=input.value;
               permission.push({id: id,permission:[]})
            })
            //nếu là dòng quyền
         }else{
            //duyệt qua từng ô input ở từng dòng xem được checked ko -> nếu có lưu tên quyền của ptu đó vào
            inputRow.forEach((input,index)=>{
               const checked=input.checked;
               if(checked){
                  permission[index].permission.push(rowName);
               }
            })
            //nếu mảng quyền to có ptu -> gửi lên backend
            if(permission.length>0){
               const formSubmit=document.querySelector("#form-submit-permission");
               const inputForm=formSubmit.querySelector("input[name='permission']");
               //chuyển mảng permission về dạng json
               console.log(permission);
               
               inputForm.value=JSON.stringify(permission)
               formSubmit.submit();
            }
         }
      })
   })
}

//khi cạp nhập quyền -> làm xanh nút checked
//lấy ra dữ liệu ở view
const dataRole=document.querySelector("[data-record]")
if(dataRole){
   const data=dataRole.getAttribute("data-record");
   //chuyển về dạng js
   const record=JSON.parse(data);
   const tablePermission=document.querySelector("[table-permission]");
   //duyệt qua từng role, và index của nó
   record.forEach((role,index)=>{
      //lấy mảng permission của role đó
      const permission=role.permissions;
      //duyệt qua từng name trong mảng permission
      permission.forEach(permission=>{
         //lấy ra các dòng có name= permission đó
         const row=tablePermission.querySelector(`[data-name="${permission}"]`);
         //lấy ra input của dòng có name=permission đó ở index của ptu
         const input=row.querySelectorAll("input")[index];
         input.checked=true;
      })
   })
}    
