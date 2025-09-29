const config = require("../../config/system")
const Setting = require('../../models/settings.model')
module.exports.general = async (req, res) => {
    const setting = await Setting.findOne()
    res.render('admin/pages/settings/index', {
        pageTitle: "Trang cài đặt chung",
        setting: setting
    })
}

module.exports.generalPatch = async (req, res) => {
    //kiểm tra xem có bản ghi chưa , nếu có r thì cập nhập còn chưa thì thêm mới
    const setting = await Setting.findOne()
    if (setting) {
        await Setting.updateOne({
            _id: setting.id
        }, req.body)
    } else {
        const settingAdd = new Setting(req.body);
        await settingAdd.save()
    }
    req.flash("success","Cập nhập thành công")
    res.redirect(req.get('referer'))
}