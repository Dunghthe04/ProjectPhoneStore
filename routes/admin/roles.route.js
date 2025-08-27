const express=require('express');
const router=express.Router();
const roleController=require('../../controller/admin/roles.controller');

router.get('/',roleController.index)
router.get('/create',roleController.create)
router.post('/create',roleController.createRole)
router.get('/detail/:id',roleController.detail)
router.get('/edit/:id',roleController.edit)
router.patch('/edit/:id',roleController.editRole)
router.patch('/delete/:id',roleController.delete)
router.get('/recover', roleController.recover)
router.patch('/recoverRole/:id', roleController.recoverRole)
router.delete('/deletePermanently/:id', roleController.deletePermanently)

module.exports=router;