const express=require('express')
const router=express.Router()
const chatController=require('../../controller/client/chat.controller')
router.get('/',chatController.index)
module.exports=router
