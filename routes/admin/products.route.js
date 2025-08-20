const express=require('express')
const router=express.Router();
const productsController=require('../../controller/admin/product.controller')
//multer
const storageMulter=require("../../helpers/storageMulter")
const multer  = require('multer')
const upload = multer({storage: storageMulter()})

router.get('/',productsController.index)
router.patch('/change-product-status/:status/:id',productsController.changeStatusProduct)
router.patch('/change-multi',productsController.changeMulti)
router.delete('/delete/:id',productsController.delete)
//recover
router.get('/recover',productsController.recoverProductIndex)
router.patch('/recoverProduct/:id',productsController.recoverProduct)
router.delete('/deletePermanently/:id',productsController.deletePermanently)
//create
router.get('/create',productsController.create)
router.post('/create',
    upload.single('thumbnail'),
    productsController.createPost)
module.exports=router