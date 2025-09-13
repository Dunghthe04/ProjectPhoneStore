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
router.get('/password/forgot',userController.forgot)
router.post('/password/forgot',forgotValidate.forgot,userController.forgotPost)
module.exports=router
