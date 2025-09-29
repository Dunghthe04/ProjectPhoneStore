//index
module.exports.index = async (req, res) => {
    //bắt sự kiện socket io bằng biến toàn app _io ở bên index
    _io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
    });
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
    })
}