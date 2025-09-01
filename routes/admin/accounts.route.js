const express=require("express")
const router=express.Router();
const accountController=require("../../controller/admin/account.controller")

const uploadMiddleware=require('../../middleware/admin/uploadCloundy.middleware')

const multer = require('multer')
const upload = multer()
const validate = require("../../validate/admin/account.validate")

router.get('/',accountController.index);
router.get('/create',accountController.create);
router.post('/create',
    upload.single('avatar'),
    uploadMiddleware.upload,
    validate.createAccount,
    accountController.createPost);
router.get('/edit/:id',accountController.edit);
router.patch('/edit/:id',
    upload.single('avatar'),
    uploadMiddleware.upload,
    validate.editAccountPatch,
    accountController.editPatch);
module.exports=router