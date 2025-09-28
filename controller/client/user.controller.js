const User = require('../../models/user.model')
const randomOTP = require('../../helpers/randomOTP')
const ForgotPassword = require('../../models/forgot-password.mode')
const SendEmailhelper = require('../../helpers/sendEmailOTP')
var md5 = require('md5');
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    })
}
module.exports.registerPost = async (req, res) => {
    const emailExist = await User.findOne({
        email: req.body.email
    })

    if (emailExist) {
        req.flash("error", "Email đã tồn tại!!!")
        res.redirect(req.get("referer"))
        return
    }
    req.body.password = md5(req.body.password)
    const user = new User(req.body);
    user.save();
    res.cookie("userToken", user.userToken)
    res.redirect('/')
}


module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    })
}



module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email không tồn tại")
        res.redirect(req.get("referer"))
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Mật khẩu không chính xác")
        res.redirect(req.get("referer"))
        return;

    }
    if (user.status == "inactive") {
        req.flash("error", "tài khoản đang bị khóa")
        res.redirect(req.get("referer"))
        return;

    }
    //gán cookie lên
    res.cookie("userToken", user.userToken);
    res.redirect("/")
}
module.exports.logout = async (req, res) => {
    res.clearCookie("userToken");
    res.redirect("/user/login")
}
module.exports.forgot = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu",
    })
}


module.exports.forgotPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    })

    //nếu email k tồn tại -> báo lỗi
    if (!user) {
        req.flash("error", "Email không tồn tại")
        res.redirect(req.get("referer"))
    }
    //nếu tồn tại email -> tạo ra object quên password, và random OTP
    const otp = randomOTP.randomOTP(8);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    //lưu vào database
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    //sau đó gửi otp sang email\
    const subject="MÃ OTP XÁC NHẬN"
    const html=`Mã otp xác nhận đổi mật khẩu của bạn là <b style="color: green">${otp}</b>. Mã có hiệu lực 3 phút`

    SendEmailhelper.sendEmail(email,subject,html)
    //sau khi có opt -> hiển thị trang nhập otp
    res.redirect(`/user/password/OPTconfirm?email=${email}`)
}
//bắt nhập otp
module.exports.OPTconfirm = async (req, res) => {
    const email = req.query.email;
    console.log("email",email);
    
    res.render("client/pages/user/confirmOTP", {
        pageTitle: "Xác nhận mã OTP",
        email:email
    })
}
//sau khi nhập otp
module.exports.OPTconfirmPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    //kiểm tra xem có email và có trong database k
    const confirm = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if (!confirm) {
        req.flash("error", "OTP đã hết hạn hoặc không chính xác")
        res.redirect(req.get('referer'))
    }

    //nếu có trả về token của thằng đó -> để khi reset thì biết thằng nào reset
    const user = await User.findOne({
        deleted: false,
        email: email
    })
    res.cookie("userToken", user.userToken)

    //chuyển hướng sang trrang xác nhận mật khẩu
    res.redirect('/user/password/reset')
}

//trang reset password 
module.exports.reset = async (req, res) => {
     res.render("client/pages/user/resetPassword", {
        pageTitle: "Cập nhập mật khẩu",
    })
}
//reset mật khẩu 
module.exports.resetPost = async (req, res) => {
    //lấy ra token để biết là tài khoản nào 
    const tokenUser = req.cookies.userToken;
    let password=req.body.password;
    password=md5(password)    

    await User.updateOne({userToken: tokenUser},{password: password})

    req.flash("success","Cập nhập mật khẩu thành công")
    res.redirect('/user/login')
}