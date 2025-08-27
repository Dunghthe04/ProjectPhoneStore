const Role = require('../../models/roles.model')
const config = require("../../config/system")
const filterHelper = require('../../helpers/FilterByStatus')
const searchHelper = require('../../helpers/searchByKeyword')
const paginationHelper = require('../../helpers/pagination')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const roles = await Role.find(find);
    res.render('admin/pages/roles/index.pug', {
        pageTitle: "Trang nhóm quyền",
        roles: roles
    })
}

module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create.pug', {
        pageTitle: "Trang tạo nhóm quyền",
    })
}

module.exports.createRole = async (req, res) => {
    try {
        const role = new Role(req.body)
        await role.save();
        req.flash("success", 'Thêm nhóm quyền thành công')
    } catch (error) {
        req.flash("error", 'Thêm nhóm quyền thất bại')
    }
    res.redirect(`${config.PrefixAdmin}/roles`)

}

module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const role = await Role.findOne(find);
        res.render('admin/pages/roles/detail.pug', {
            pageTitle: "Chi tiết nhóm quyền",
            role: role
        })
    } catch (error) {
        req.flash("error", 'Không thấy nhóm quyền phù hợp')
        res.redirect(`${config.PrefixAdmin}/roles`)
    }

}
module.exports.edit = async (req, res) => {
  //lấy ra sản phẩm truyền về để hiển thị data
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const role = await Role.findOne(find);
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Trang chỉnh sửa",
      role: role,
    })
  } catch (error) {
    req.flash("error", "Không tìm thấy nhóm quyền")
    res.redirect(req.get("referer"))
  }
}

module.exports.editRole = async (req, res) => {
  try {
    await Role.updateOne({
      _id: req.params.id
    }, req.body)
    req.flash("success", "Cập nhập nhóm quyền thành công")
  } catch (error) {
    req.flash("error", "Không tìm thấy thông tin nhóm quyền")
  }
  res.redirect(`${config.PrefixAdmin}/roles`)
}

module.exports.delete = async (req, res) => {
  try {
    await Role.updateOne({
      _id: req.params.id
    }, {
      deleted: true
    })
    req.flash("success", "Xóa nhóm quyền thành công")
  } catch (error) {
    req.flash("error", "Không tìm thấy thông tin nhóm quyền")
  }
  res.redirect(`${config.PrefixAdmin}/roles`)
}

module.exports.recover = async (req, res) => {
    const filterStatus = filterHelper(req.query);

    const find = {
        deleted: true
    }
    //lấy status trên url(2) và gán vô find
    if (req.query.status) {
        find.status = req.query.status;
    }

    //Tối ưu search keyword
    const objectSearch = searchHelper(req.query);
    //lấy regex và gán vô find
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    //Pagination
    const countNumberDocuments = await Role.countDocuments(find);
    //tối ưu pagination(mục tiêu truyền vào các data cần thiết và trả về object sau khi thao tác)
    const objectPagination = paginationHelper({
        currentPage: 1,
        limit: 5
    }, req.query, countNumberDocuments)


    const roleList = await Role.find(find).limit(objectPagination.limit).skip(objectPagination.skip)

    res.render('admin/pages/roles/recover.pug', {
        pageTitle: "Xóa gần đây",
        roleList: roleList,
        filterButtons: filterStatus,
        keywordSearch: objectSearch.keyword,
        objectPagination: objectPagination
    })

}

module.exports.recoverRole = async (req, res) => {
    const id = req.params.id;

    await Role.updateOne({
        _id: id
    }, {
        deleted: false,
    });
    req.flash("success", `Khôi phục nhóm quyền thành công sản phẩm ${id}`);
    res.redirect(req.get("referer"))
}

module.exports.deletePermanently = async (req, res) => {
    const id = req.params.id;
    await Role.deleteOne({
        _id: id
    })
    req.flash("success", `Đã xóa vĩnh viễn nhóm quyền ${id}`);
    res.redirect(req.get("referer"))
}
