import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
//lấy thông tin đoạn chat(phía client) gửi lên server(controller)
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

//nhận tin nhắn từ server gửi về
socket.on("SERVER_RESPONSE_MESS",(data)=>{
  //Lấy ra id chat của user hiện tại
  const user_id=document.querySelector("[user_id]").getAttribute("user_id");
  //tạo ra 1 thẻ bọc sau đó chèn content và fullname
  const div=document.createElement("div")

  //kiểm tra xem tin nào của ông í -> ko hiện tên và hiện bên phải(dựa trên id từ server và id từ html)
  let html=''
  if(data.user_id==user_id){
    div.classList.add("inner-outgoing");
  }else{
    div.classList.add("inner-incoming");
    html=`
     <div class="inner-name">${data.fullname}</div>
      `
  }
  div.innerHTML=`
     ${html}
     <div class="inner-content">${data.content}</div>
    `;
  //sau đó chèn vào boddy
  const body=document.querySelector(".chat .inner-body");
  body.appendChild(div)
  //sau khi chèn xong cũng phải cuộn xuống
  bodyChat.scrollTop=bodyChat.scrollHeight;
})

//Thêm js để khi mà có tin mới -> scroll phải cuộc cuối cùng
const bodyChat=document.querySelector(".chat .inner-body");
if(bodyChat){
  //cách top đúng = chiều rộng
  bodyChat.scrollTop=bodyChat.scrollHeight;
}

//Hien popup emoji-picker
//bat su kien khi click vao emoji
const button=document.querySelector(".chat .inner-foot .button-icon");
if(button){
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(button, tooltip)
  button.onclick=()=>{
     tooltip.classList.toggle('shown')
  }
}

//laays icon khi click
const emoji=document.querySelector('emoji-picker')
if(emoji){
  let input=document.querySelector(".chat .inner-foot input")
  emoji.addEventListener('emoji-click', (e) => {
    const icon=e.detail.unicode
    //laasy o input ra roi chen vao
    input.value=input.value+icon
  });

  //Typing-> ghi ng dùng gõ phím
  input.addEventListener('keyup',(e)=>{
    socket.emit("CLIENT_IS_TYPING","type")
  })

}

//Lấy thông báo SERVER_RESPONSE_TYPING
socket.on("SERVER_RESPONSE_TYPING",(data)=>{
  console.log(data);
})





  