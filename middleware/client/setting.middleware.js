const Setting = require('../../models/settings.model')

module.exports.setting = async (req, res, next) => {
  //lấy ra settings của admin
  const setting=await Setting.findOne()
  res.locals.setting=setting
  next();
}