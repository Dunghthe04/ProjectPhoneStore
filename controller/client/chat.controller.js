const Chat=require('../../models/chats.model')
const User=require('../../models/user.model')
//index
module.exports.index = async (req, res) => {
    //bắt sự kiện socket io bằng biến toàn app _io ở bên index
    //_io.once-> client có kết nối nhiều lần -> listener chỉ nghe duy nhất 1 lần, 
    //tránh việc gửi 1 tin load đi load lại sẽ lưu nhiều xuống database
    _io.once('connection', (socket) => {
        //bắt sự kiên client gửi lên
        socket.on('CLIENT_SEND_MESS', async(msg) => {
            //lưu tin nhắn vào database
            //lấy ra ng nhắn
            const user=res.locals.user;
            const message=msg
            const newChat={
                user_id:user.id,
                content:message
            }

            const chat=new Chat(newChat)
            await chat.save();

            //lưu server xong trả luôn tin nhắn đó về phía mọi người-realtime
            //trả về gồm id người gửi, tên ng gửi, nội dung
            _io.emit("SERVER_RESPONSE_MESS",{
               user_id:user.id,
               fullname:user.fullname,
               content:msg
            })
        });
    });

    //lấy chat từ databse hiển thị giao diện
    const chats=await Chat.find({deleted:false})
    //lấy ra cả tên của người chat
    for (let item of chats) {
        const user=await User.findOne({_id: item.user_id}).select("fullname")
        item.fullname=user.fullname

    }
    
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats:chats
    })
}