
const express=require('express')
const router=express.Router();
const myAccountController=require('../../controller/admin/myAccount.controller')

const uploadMiddleware=require('../../middleware/admin/uploadCloundy.middleware')

const multer = require('multer')
const upload = multer()
const validate = require("../../validate/admin/account.validate")

router.get('/',myAccountController.index)
router.get('/edit',myAccountController.edit)
router.patch('/edit',
    upload.single('avatar'),
    uploadMiddleware.upload,
    validate.editAccountPatch,
    myAccountController.editPatch)

module.exports=router;