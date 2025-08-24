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

module.exports=router;