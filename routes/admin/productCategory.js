const express=require('express')
const router=express.Router();

const multer = require('multer')
const upload = multer()

const validate = require("../../validate/admin/product-category.validate")

const uploadMiddleware=require('../../middleware/admin/uploadCloundy.middleware')

const productCategoryController=require('../../controller/admin/productCategory.controller')
router.get('/',productCategoryController.index)
router.get('/create',productCategoryController.create)
router.post('/create',
    upload.single('thumbnail'),
    uploadMiddleware.upload,
    validate.createProductCategory,
    productCategoryController.createProductCategory)
router.get('/edit/:id',productCategoryController.edit)    
router.post('/edit/:id',
    upload.single('thumbnail'),
    uploadMiddleware.upload,
    validate.createProductCategory,
    productCategoryController.editProductCategory)
router.get('/detail/:id',productCategoryController.detail)    
router.patch('/delete/:id',productCategoryController.delete) 
//recover
router.get('/recover', productCategoryController.recoverProducCategorytIndex)
router.patch('/recoverProduct/:id', productCategoryController.recoverProduct)
router.delete('/deletePermanently/:id', productCategoryController.deletePermanently)
module.exports=router;