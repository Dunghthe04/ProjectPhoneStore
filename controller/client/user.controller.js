const User = require('../../models/user.model')
const randomOTP = require('../../helpers/randomOTP')
const ForgotPassword = require('../../models/forgot-password.mode')
const SendEmailhelper = require('../../helpers/sendEmailOTP')
const Cart=require('../../models/carts.model')
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
    //lấy ra cart dựa trên user_id đăng nhập
    const cart=await Cart({user_id: user.id})
    if(cart){
        //nếu mà có cart -> cái cart đó đã lưu user rồi -> chỉ cần lấy token của nó đẩy lên
        res.cookie("userToken", user.userToken);
    }else{
        //nếu mà ko có cart nào user như vậy -> lần đầu đăng nhâp -> tìm cart đó và lưu user
        await Cart.updateOne({id: req.cookies.cartId},{user_id: user.id})
    }
    //gán cookie lên
    res.cookie("userToken", user.userToken);
    res.redirect("/")
}
module.exports.logout = async (req, res) => {
    //log out xóa cartId đi vì nếu tạo tài khoản mới cartid trùng nhau
    res.clearCookie("userToken");
    res.clearCookie("cartId");
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
    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background: #1877f2; color: #fff; padding: 16px; text-align: center;">
      <h2>Xác nhận đổi mật khẩu</h2>
    </div>
    <div style="padding: 20px; color: #333; line-height: 1.5;">
      <p>Xin chào,</p>
      <p>Mã OTP xác nhận đổi mật khẩu của bạn là:</p>
      <p style="font-size: 24px; font-weight: bold; color: green; text-align: center; margin: 20px 0;">
        ${otp}
      </p>
      <p>Mã có hiệu lực trong <b>3 phút</b>. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
    </div>
    <div style="background: #f9f9f9; padding: 12px; text-align: center; font-size: 12px; color: #888;">
      Đây là email tự động, vui lòng không trả lời.
    </div>
  </div>
  `;

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

//thông tin tài khoản
module.exports.info = async (req, res) => {
    // lấy thông tin tài khoản dựa trên userToken
    const userToken=req.cookies.userToken;

    const user=await User.findOne({userToken: userToken})
    res.render("client/pages/user/inforUser", {
        pageTitle: "Thông tin tài khoản",
        user:user
    })
}