const express=require('express')
const router=express.Router();
const productsController=require("../../controller/client/products.controller")

router.get('/',productsController.index)

module.exports=router