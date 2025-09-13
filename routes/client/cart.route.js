const express=require('express')
const router=express.Router()
const cartController=require('../../controller/client/cart.controller')

router.get('/',cartController.index)
router.post('/add/:productId',cartController.addPost)
router.get('/delete/:productId',cartController.delete)
module.exports=router
