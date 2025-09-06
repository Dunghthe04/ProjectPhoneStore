const productCategory = require('../../models/productCategory.model')
const treHelper = require('../../helpers/treeSelect')
const config = require("../../config/system")
const filterHelper = require('../../helpers/FilterByStatus')
const searchHelper = require('../../helpers/searchByKeyword')
const paginationHelper = require('../../helpers/pagination')

module.exports.index = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-view")) {
        const find = {
            deleted: false
        } 
        const record = await productCategory.find(find)
        const newRecord = treHelper.tree(record);
        res.render('admin/pages/product-category/index.pug', {
            pageTitle: "Trang danh mục sản phẩm",
            newRecord: newRecord
        })
    } else {
        res.send("404")
    }

}

module.exports.create = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-add")) {
        const find = {
            deleted: false
        }

        const record = await productCategory.find(find);
        const newRecord = treHelper.tree(record);
        res.render('admin/pages/product-category/create.pug', {
            pageTitle: "Trang tạo danh mục sản phẩm ",
            newRecord: newRecord
        })
    } else {
        res.send("404")
    }

}

module.exports.createProductCategory = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-add")) {
        //nếu k nhập postion -> đếm rồi +1 
        if (req.body.position === "") {
            const numberOfProduct = await productCategory.countDocuments();
            req.body.position = numberOfProduct + 1;
        } else {
            req.body.position = req.body.position;
        }
        //tạo product với thông tin trong req.body, rồi lưu vào database
        const product_Category = new productCategory(req.body);
        await product_Category.save();

        req.flash("success", "Thêm danh mục sản phẩm")
        res.redirect(`${config.PrefixAdmin}/product-category`)
    } else {
        res.send("404")
    }


}

module.exports.edit = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-edit")) {
        try {
            const record = await productCategory.find({
                deleted: false
            });
            const newRecord = treHelper.tree(record);

            const editProductCategory = await productCategory.findOne({
                _id: req.params.id
            });

            res.render("admin/pages/product-category/edit.pug", {
                pageTitle: "Trang chỉnh sửa",
                editProductCategory: editProductCategory,
                newRecord: newRecord
            })
        } catch (error) {
            req.flash("error", "Không tìm thấy thông tin danh mục sản phẩm")
            res.redirect(req.get("referer"))
        }
    } else {
        res.send("404")
    }

}

module.exports.editProductCategory = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-edit")) {
        try {
            req.body.position = parseInt(req.body.position)
            await productCategory.updateOne({
                _id: req.params.id
            }, req.body)
            req.flash("success", "Cập nhập danh mục sản phẩm thành công")
            res.redirect(`${config.PrefixAdmin}/product-category`)
        } catch (error) {
            req.flash("error", "Không thể chinh sửa danh mục sản phẩm")
            res.redirect(req.get("referer"))
        }
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
        const productCategoryDetail = await productCategory.findOne(find);


        res.render("admin/pages/product-category/detail.pug", {
            productCategoryDetail: productCategoryDetail,
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy thông tin danh mục sản phẩm")
        res.redirect(req.get("referer"))
    }
}

module.exports.delete = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-delete")) {
        try {
            const find = {
                deleted: false,
                _id: req.params.id
            }
            await productCategory.updateOne({
                _id: req.params.id
            }, {
                deleted: true
            })
            req.flash("success", "Xóa danh mục sản phẩm thành công")
            res.redirect(`${config.PrefixAdmin}/product-category`)
        } catch (error) {
            req.flash("error", "Không tìm thấy thông tin danh mục sản phẩm")
            res.redirect(req.get("referer"))
        }
    } else {
        res.send("404")
    }
}

module.exports.recoverProducCategorytIndex = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-delete")) {
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
        const countNumberDocuments = await productCategory.countDocuments(find);
        //tối ưu pagination(mục tiêu truyền vào các data cần thiết và trả về object sau khi thao tác)
        const objectPagination = paginationHelper({
            currentPage: 1,
            limit: 5
        }, req.query, countNumberDocuments)


        const productCategoryList = await productCategory.find(find).limit(objectPagination.limit).skip(objectPagination.skip)

        res.render('admin/pages/product-category/recover.pug', {
            pageTitle: "Xóa gần đây",
            productCategoryList: productCategoryList,
            filterButtons: filterStatus,
            keywordSearch: objectSearch.keyword,
            objectPagination: objectPagination
        })
    } else {
        res.send("404")
    }
}

module.exports.recoverProduct = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-delete")) {
        const id = req.params.id;

        await productCategory.updateOne({
            _id: id
        }, {
            deleted: false,
        });
        req.flash("success", `Khôi phục danh mục thành công sản phẩm ${id}`);
        res.redirect(req.get("referer"))
    } else {
        res.send("404")
    }

}

module.exports.deletePermanently = async (req, res) => {
    if (res.locals.roleAccount.permissions.includes("product-category-delete")) {
        const id = req.params.id;
        await productCategory.deleteOne({
            _id: id
        })
        req.flash("success", `Đã xóa vĩnh viễn sản phẩm ${id}`);
        res.redirect(req.get("referer"))
    } else {
        res.send("404")
    }

}