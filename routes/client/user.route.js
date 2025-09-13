const express=require('express')
const router=express.Router()
const userController=require('../../controller/client/user.controller')
const registerValidate=require('../../validate/client/register.validate')

router.get('/register',userController.register)
router.post('/register',registerValidate.register,userController.registerPost)
router.get('/login',userController.login)
router.post('/login',registerValidate.login,userController.loginPost)
router.get('/logout',userController.logout)
module.exports=router
