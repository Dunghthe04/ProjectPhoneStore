import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
//lấy thông tin đoạn chat(phía client) gửi lên server(controller)
const form = document.querySelector(".chat .inner-form")
if (form) {
  //lăng nghe sự kiện submit
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const value = e.target.elements.content.value;
    if (value) {
      //có giá trị gửi lên server
      socket.emit("CLIENT_SEND_MESS", value);
      e.target.elements.content.value = "";
      //gửi xong ẩn .. đi
      socket.emit("CLIENT_IS_TYPING", "hidden")
    }
  })
}

//nhận tin nhắn từ server gửi về
socket.on("SERVER_RESPONSE_MESS", (data) => {
  //Lấy ra id chat của user hiện tại
  const user_id = document.querySelector("[user_id]").getAttribute("user_id");
  //tạo ra 1 thẻ bọc sau đó chèn content và fullname
  const div = document.createElement("div")
  //thẻ typing
  const elementListTyping = document.querySelector(".chat .inner-list-typing");
  //body
  const body = document.querySelector(".chat .inner-body");

  //kiểm tra xem tin nào của ông í -> ko hiện tên và hiện bên phải(dựa trên id từ server và id từ html)
  let html = ''
  if (data.user_id == user_id) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    html = `
     <div class="inner-name">${data.fullname}</div>
      `
  }
  div.innerHTML = `
     ${html}
     <div class="inner-content">${data.content}</div>
    `;
  //sau đó chèn vào boddy, nhưng phải chèn vào trước typing,typing luôn ở cuối
  body.insertBefore(div, elementListTyping)
  //sau khi chèn xong cũng phải cuộn xuống
  bodyChat.scrollTop = bodyChat.scrollHeight;
})

//Thêm js để khi mà có tin mới -> scroll phải cuộc cuối cùng
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  //cách top đúng = chiều rộng
  bodyChat.scrollTop = bodyChat.scrollHeight;
}

//Hien popup emoji-picker,bat su kien khi click vao emoji
const button = document.querySelector(".chat .inner-foot .button-icon");
if (button) {
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(button, tooltip)
  button.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}

//function hủy typing
let timeout;
const cancelTyping = () => {
  //Vẫn đang gõ -> xóa timeout -> hidden ko được gửi. Khi ngừng gõ -> setimeout cuối sẽ gửi
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    socket.emit("CLIENT_IS_TYPING", "hidden") //sau 3 giây dừng ko gõ -> gửi hidden để ẩn
  }, 3000);
}

//laays icon khi click
const emoji = document.querySelector('emoji-picker')
if (emoji) {
  let input = document.querySelector(".chat .inner-foot input")
  emoji.addEventListener('emoji-click', (e) => {
    const icon = e.detail.unicode
    //laasy o input ra roi chen vao
    input.value = input.value + icon
    //khi nhập quá dài -> nhập icon ->nó hiểu onblur -> focus đầu-> ta muốn nó vẫn focus cuối
    let length=input.value.length;
    input.setSelectionRange(length,length)//đặt con trỏ về cuối
    input.focus()
    //chèn icon xong thì cũng -> typing
    socket.emit("CLIENT_IS_TYPING", "show")
    //khi k nhập nữa -> hủy typing
    cancelTyping();

  });

  //Typing-> ghi ng dùng gõ phím
  input.addEventListener('keyup', (e) => {
    socket.emit("CLIENT_IS_TYPING", "show") // cờ: show -> báo cho controller là hiển thị ..., còn hidden là đóng
    //ko nhập nữa -> hủy typing
    cancelTyping();
  })

}

//Lấy thông báo SERVER_RESPONSE_TYPING
//lấy ra box list-typing
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RESPONSE_TYPING", (data) => {
    console.log(data);
    //nếu data là showw -> tạo div rồi nhúng vào, còn nếu hidden ẩn đi
    if (data.type == "show") {
      //kiểm tra xem có box nào có userId= ông hiện tại ko
      const checkExitsTyping = elementListTyping.querySelector(`[user_id="${data.user_id}"]`)

      //nếu chưa có -> tạo box , class, user_id
      //còn nếu có rồi thì thôi, để chỉ tạo 1 lần typing
      if (!checkExitsTyping) {
        //tạo ra 1 ptu tên box-tyoping, rồi append vào listTyping
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");

        //thêm thuộc tính là id của người dùng
        boxTyping.setAttribute("user_id", data.user_id);
        //thêm các thẻ (tên, ...) vào 
        boxTyping.innerHTML = `
        <div class="inner-name">${data.fullname}</div>
        <div class="inner-dots">
             <span></span> 
             <span></span> 
             <span></span> 
        </div>                 
      `
        //sau đó apend vào list-typing
        elementListTyping.appendChild(boxTyping)
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }


    } else {
      //nếu là hidden-> remove box-typing đi
      const boxTypingRemove = elementListTyping.querySelector(`[user_id="${data.user_id}"]`)
      console.log(boxTypingRemove);

      elementListTyping.removeChild(boxTypingRemove);
    }
  })
}