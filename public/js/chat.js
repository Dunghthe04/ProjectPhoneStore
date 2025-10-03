import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
//lấy thông tin đoạn chat(phía client) gửi lên server(controller)
const form = document.querySelector(".chat .inner-form")
if (form) {
  //lắng nghe sự kiện submit tin nhắn
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.content.value;
    //nếu có giá trị -> gửi lên server
    socket.emit("CLIENT_SEND_MESS", value);
    //reset về ô input trắng
    e.target.elements.content.value = "";
    //gửi xong ẩn typing đi
    socket.emit("CLIENT_IS_TYPING", "hidden")
  })
}

//nhận tin nhắn từ server gửi về(gồm thông tin ng gửi)
socket.on("SERVER_RESPONSE_MESS", (data) => {
  //lấy ra biến cờ user_id để biết user nào đang nhắn
  const user_id = document.querySelector("[user_id]").getAttribute("user_id");
  //tạo 1 thẻ div bọc tên + tin nhắn
  const boxMessage = document.createElement("div");
  //Lấy ra body để cuộn scroll
  const bodyElement = document.querySelector(".chat .inner-body");
  //Lấy ra box-typing
  const elementListTyping = document.querySelector(".chat .inner-list-typing");

  //Kiểm tra xem user_id tin nhắn có phải là user_id hiện tại k -> hiện phải ko tên: hiện trái có tên
  let html = '';
  if (user_id == data.user_id) {
    boxMessage.classList.add("inner-outgoing");
  } else {
    boxMessage.classList.add("inner-incoming");
    html = `
     <div class="inner-name">${data.fullname}</div>
     `
  }
  boxMessage.innerHTML = `
    ${html}
     <div class="inner-content">${data.content}</div>
  `
  //Insert box-message đó trước typing -> box-typing phải ở cuối
  bodyElement.insertBefore(boxMessage, elementListTyping);
  //insert xong phải cuộn tin nhắn xuống cuối
  bodyElement.scrollTop = bodyChat.scrollHeight;
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

let timeout
const cancelTyping = () => {
  //nó sẽ luôn hủy timeout trước đó, nếu lần gõ phím cuối -> timeout cuối bị gọi, lúc này sẽ ẩn đi typing
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    socket.emit("CLIENT_IS_TYPING", "hidden")
  }, 3000)
}

//Lấy icon khi click chọn
const emoji = document.querySelector('emoji-picker')
if (emoji) {
  let input = document.querySelector(".chat .inner-foot input")
  emoji.addEventListener('emoji-click', (e) => {
    //lấy ra icon
    const icon = e.detail.unicode
    //ghép icon đó vào value hiện tại
    input.value = input.value + icon
    //Khi chọn icon -> nó hiểu onBlur-> ta đặt con trỏ cuối và rồi focus inout
    let inputLength = input.value.length;
    input.setSelectionRange(inputLength, inputLength) //đặt trỏ chuột cuôi
    input.focus();
    //chèn icon -> thì cũng là typing
    socket.emit("CLIENT_IS_TYPING", "show");
    //nếu ko gõ nữa -> ẩn
    cancelTyping();

  })

  //Bắt sự kiện typing input
  input.addEventListener('keyup', (e) => {
    socket.emit("CLIENT_IS_TYPING", "show");
    //khi dừng ấn -> ẩn
    cancelTyping()
  })
}

//Lấy thông báo typing từ server
//Lấy ra box-typing
const listBoxTyping = document.querySelector(".chat .inner-list-typing");
if (listBoxTyping) {
  socket.on("SERVER_RESPONSE_TYPING", (data) => {
    //nếu là show -> tạo 1 boxTyping (tên, và group ...)
    if (data.type == "show") {
      //Kiểm tra xem có box có thuộc tính user_id chưa, mục tiêu chỉ để tạo ra 1 box typing thôi
      const checkExistBoxTyping = listBoxTyping.querySelector(`[user_id="${data.user_id}"]`);
      if (!checkExistBoxTyping) {
        //nếu chưa có thì tạo 1 boxTyping
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        //gán thêm thuộc tính user_id
        boxTyping.setAttribute("user_id", data.user_id)
        boxTyping.innerHTML = `
        <div class="inner-name">${data.fullname}</div>
        <div class="inner-dots">
             <span></span> 
             <span></span> 
             <span></span> 
        </div> 
        `
        //chèn box-typing đó vào listBox
        listBoxTyping.appendChild(boxTyping);
        //thêm xong cx phải cuộn
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      //nếu là hidden-> xóa boxTyping đi
      const boxTypingRemove = listBoxTyping.querySelector(`[user_id="${data.user_id}"]`);
      if (boxTypingRemove) {
        listBoxTyping.removeChild(boxTypingRemove)
      }
    }
  })
}