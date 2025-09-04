const productCategory = require('../../models/productCategory.model')
const treHelper = require('../../helpers/treeSelect')
const config = require("../../config/system")

module.exports.productcategory=async(req,res,next)=>{
  const record = await productCategory.find({deleted: false})
  const layoutProductCategory = treHelper.tree(record);

  res.locals.layoutProductCategory=layoutProductCategory;
  next();

}