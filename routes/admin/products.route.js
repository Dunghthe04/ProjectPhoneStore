const express=require('express')
const router=express.Router();
const productsController=require('../../controller/admin/product.controller')

router.get('/',productsController.index)
router.patch('/change-product-status/:status/:id',productsController.changeStatusProduct)
router.patch('/change-multi',productsController.changeMulti)
router.delete('/delete/:id',productsController.delete)
module.exports=router