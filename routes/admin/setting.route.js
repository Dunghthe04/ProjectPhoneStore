
const express=require('express')
const router=express.Router();
const multer = require('multer')
const upload = multer()
const settingController=require('../../controller/admin/setting.controller')
const uploadMiddleware=require('../../middleware/admin/uploadCloundy.middleware')



router.get('/general',settingController.general)
router.patch('/general',
    upload.single('logo'),
    uploadMiddleware.upload,
    settingController.generalPatch)
module.exports=router;