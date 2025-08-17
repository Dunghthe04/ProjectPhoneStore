const express=require('express')
const router=express.Router();
const productsController=require('../../controller/admin/product.controller')

router.get('/',productsController.index)
router.patch('/change-product-status/:status/:id',productsController.changeStatusProduct)

module.exports=router