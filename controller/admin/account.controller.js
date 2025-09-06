const Account = require('../../models/accounts.model');
const Role = require('../../models/roles.model')
var md5 = require('md5');
const config = require("../../config/system")
module.exports.index = async (req, res) => {
    //check xem co quyen ko
    if (res.locals.roleAccount.permissions.includes("account-view")) {
        const find = {
            deleted: false
        }
        //từ role_id -> lấy ra role va gán vào các ptu
        const account = await Account.find(find).select("-password -token")
        for (const item of account) {
            const role = await Role.findOne({
                _id: item.role_id,
                deleted: false
            })
            item.role = role;
        }

        res.render('admin/pages/accounts/index.pug', {
            pageTitle: "Trang quản lý tài khoản",
            account: account
        })
    } else {
        res.send("không có quyền")
    }

}

module.exports.create = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("account-add")) {
        const role = await Role.find({
            deleted: false
        })
        res.render('admin/pages/accounts/create.pug', {
            pageTitle: "Trang quản lý tài khoản",
            role: role
        })
    } else {
        res.send("không có quyền")
    }

}

module.exports.createPost = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("account-add")) {
        try {
            console.log(req.body);

            //mã hóa mật khẩu
            req.body.password = md5(req.body.password)
            //kiểm tra xem email đã tồn tại chưa
            const existEmail = await Account.findOne({
                email: req.body.email
            })
            if (existEmail) {
                req.flash("error", "Email đã tồn tại")
                res.redirect(req.get("referer"))
            } else {
                const account = new Account(req.body)
                await account.save();
                req.flash("success", "Tạo tài khoản thành công")
                res.redirect(`${config.PrefixAdmin}/accounts`)
            }
        } catch (error) {
            req.flash("error", "Lỗi khi tạo tài khoản")
            res.redirect(req.get("referer"))
        }
    } else {
        res.send("không có quyền")
    }

}

module.exports.edit = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("account-edit")) {
        const find = {
            _id: req.params.id,
            deleted: false
        }
        const account = await Account.findOne(find)
        console.log(account);

        const role = await Role.find({
            deleted: false
        })
        res.render('admin/pages/accounts/edit.pug', {
            pageTitle: "Trang chỉnh sửa tài khoản",
            account: account,
            role: role
        })
    } else {
        res.send("không có quyền")
    }

}

module.exports.editPatch = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("account-edit")) {
        const id = req.params.id;
        //kiểm tra xem email tồn tại ko ( ngoại trừ email tkhoan htai)
        const existEmail = await Account.findOne({
            _id: {
                $ne: id
            },
            email: req.body.email,
            deleted: false
        })

        if (existEmail) {
            req.flash("error", "Email đã tồn tại")
            res.redirect(req.get("referer"))
        } else {
            //Mã hóa mật khẩu mới nếu có
            if (req.body.password) {
                req.body.password = md5(req.body.password)
            } else {
                delete req.body.password;
            }
            await Account.updateOne({
                _id: id
            }, req.body)
            req.flash("success", "Cập nhập tài khoản thành công")
        }
        res.redirect(req.get("referer"))
    } else {
        res.send("không có quyền")
    }

}