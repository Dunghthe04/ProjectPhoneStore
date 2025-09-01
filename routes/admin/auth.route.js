const express=require('express')
const router=express.Router();
const authController=require('../../controller/admin/auth.controller')
const validate=require("../../validate/admin/auth.validate")
router.get('/login',authController.login)
router.post('/login',
    validate.login,
    authController.loginPost)
router.get('/logout',authController.logout)
module.exports=router;