//lấy thông tin đoạn chat(phía client) gửi lên server(controller)

//lấy form
const form=document.querySelector(".chat .inner-form")
if(form){
  //lăng nghe sự kiện submit
  form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const value= e.target.elements.content.value;
    if(value){
        //có giá trị gửi lên server
        socket.emit("CLIENT_SEND_MESS",value);
        e.target.elements.content.value=""; 
    }
  })    
}