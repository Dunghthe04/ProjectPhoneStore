const express=require('express')
const router=express.Router()
const userController=require('../../controller/client/user.controller')
const registerValidate=require('../../validate/client/register.validate')
const forgotValidate=require('../../validate/client/forgot.validate')

router.get('/register',userController.register)
router.post('/register',registerValidate.register,userController.registerPost)
router.get('/login',userController.login)
router.post('/login',registerValidate.login,userController.loginPost)
router.get('/logout',userController.logout)
// quên mk -> và hiện lên nhập email và xác nhận
router.get('/password/forgot',userController.forgot)
router.post('/password/forgot',forgotValidate.forgot,userController.forgotPost)
//nhập xong -> nhập opt và xác nhận
router.get('/password/OPTconfirm',userController.OPTconfirm)
router.post('/password/OPTconfirm',forgotValidate.optEnter,userController.OPTconfirmPost)
//sang trang reset password
router.get('/password/reset',userController.reset)
router.post('/password/reset',forgotValidate.resetPassword,userController.resetPost)

//thông tin tài khoản client
router.get('/info',userController.info)
module.exports=router
