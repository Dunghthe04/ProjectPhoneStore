const Role = require('../../models/roles.model')
const config = require("../../config/system")
const filterHelper = require('../../helpers/FilterByStatus')
const searchHelper = require('../../helpers/searchByKeyword')
const paginationHelper = require('../../helpers/pagination')
module.exports.index = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-view")) {
    const find = {
      deleted: false
    }
    const roles = await Role.find(find);
    res.render('admin/pages/roles/index.pug', {
      pageTitle: "Trang nhóm quyền",
      roles: roles
    })
  } else {
    res.send("404")
  }
}

module.exports.create = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-add")) {
    res.render('admin/pages/roles/create.pug', {
      pageTitle: "Trang tạo nhóm quyền",
    })
  } else {
    res.send("404")
  }

}

module.exports.createRole = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-add")) {
    try {
      const role = new Role(req.body)
      await role.save();
      req.flash("success", 'Thêm nhóm quyền thành công')
    } catch (error) {
      req.flash("error", 'Thêm nhóm quyền thất bại')
    }
    res.redirect(`${config.PrefixAdmin}/roles`)
  } else {
    res.send("404")
  }
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
  if (res.locals.roleAccount.permissions.includes("role-edit")) {
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
  } else {
    res.send("404")
  }

}

module.exports.editRole = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-edit")) {
    try {
      await Role.updateOne({
        _id: req.params.id
      }, req.body)
      req.flash("success", "Cập nhập nhóm quyền thành công")
    } catch (error) {
      req.flash("error", "Không tìm thấy thông tin nhóm quyền")
    }
    res.redirect(`${config.PrefixAdmin}/roles`)
  } else {
    res.send("404")
  }

}

module.exports.delete = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-delete")) {
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
  } else {
    res.send("404")
  }
}

module.exports.recover = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-delete")) {
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
  } else {
    res.send("404")
  }
}

module.exports.recoverRole = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-delete")) {
    const id = req.params.id;

    await Role.updateOne({
      _id: id
    }, {
      deleted: false,
    });
    req.flash("success", `Khôi phục nhóm quyền thành công sản phẩm ${id}`);
    res.redirect(req.get("referer"))
  } else {
    res.send("404")
  }

}

module.exports.deletePermanently = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-delete")) {
    const id = req.params.id;
    await Role.deleteOne({
      _id: id
    })
    req.flash("success", `Đã xóa vĩnh viễn nhóm quyền ${id}`);
    res.redirect(req.get("referer"))
  } else {
    res.send("404")
  }
}

module.exports.permission = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-permission")) {
    const find = {
      deleted: false
    }

    const role = await Role.find(find)
    res.render("admin/pages/roles/permission.pug", {
      pageTitle: "Trang phân quyền",
      role: role
    })
  } else {
    res.send("404")
  }
}

module.exports.permissionPatch = async (req, res) => {
  if (res.locals.roleAccount.permissions.includes("role-permission")) {
    //chuyển về dạng js
    const permission = JSON.parse(req.body.permission);
    //duyệt qua từng ptu 1(gồm id và permission)
    for (item of permission) {
      await Role.updateOne({
        _id: item.id
      }, {
        permissions: item.permission
      })
    }

    req.flash("success", "Cập nhập phân quyền thành công")
    res.redirect(req.get("referer"))
  } else {
    res.send("404")
  }
}