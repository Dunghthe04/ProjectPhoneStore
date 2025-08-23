const express=require('express')
const router=express.Router();
const productsController=require("../../controller/client/products.controller")

router.get('/',productsController.index)
router.get('/detail/:slug',productsController.detail)
module.exports=router