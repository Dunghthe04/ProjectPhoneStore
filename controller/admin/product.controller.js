const products = require('../../models/product.model')
const filterHelper = require('../../helpers/FilterByStatus')
const searchHelper = require('../../helpers/searchByKeyword')
const paginationHelper = require('../../helpers/pagination')
module.exports.index = async (req, res) => {

  //Tối ưu các nút search by status
  const filterStatus = filterHelper(req.query);

  //lọc
  const find = {
    deleted: false
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
  const countNumberDocuments = await products.countDocuments(find);
  //tối ưu pagination(mục tiêu truyền vào các data cần thiết và trả về object sau khi thao tác)
  const objectPagination = paginationHelper({
    currentPage: 1,
    limit: 5
  }, req.query, countNumberDocuments)


  const productList = await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip)

  res.render('admin/pages/products/index', {
    pageTitle: "Danh sach san pham",
    products: productList,
    filterButtons: filterStatus,
    keywordSearch: objectSearch.keyword,
    objectPagination: objectPagination
  })
}

module.exports.changeStatusProduct = async (req, res) => {
  //lấy ra id product, và status muốn cập nhập
  const status = req.params.status;
  const id = req.params.id;

  await products.updateOne({
    _id: id
  }, {
    status: status
  })

  res.redirect(req.get("referer"))
}

module.exports.changeMulti = async (req, res) => {
  //lấy ra các id và type ơ req.body
  const type = req.body.type;
  const ids = req.body.ids;
  const productsIdChange = ids.split(", ");

  switch (type) {
    case 'active':
      await products.updateMany({
        _id: {
          $in: productsIdChange
        }
      }, {
        status: type
      })
      break;
    case 'inactive':
      await products.updateMany({
        _id: {
          $in: productsIdChange
        }
      }, {
        status: type
      })
      break;
    default:
      break;
  }
  res.redirect(req.get("referer"))
}

module.exports.delete = async (req, res) => {
  const productId = req.params.id;

  //xóa cứng
  //await products.deleteOne({_id: productId});

  //xóa mềm
  await products.updateOne({
    _id: productId
  }, {
    deleted: true,
    deletedAt: new Date()
  });
  res.redirect(req.get("referer"))
}

//index khôi phục sản phẩm
module.exports.recoverProductIndex = async (req, res) => {
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
  const countNumberDocuments = await products.countDocuments(find);
  //tối ưu pagination(mục tiêu truyền vào các data cần thiết và trả về object sau khi thao tác)
  const objectPagination = paginationHelper({
    currentPage: 1,
    limit: 5
  }, req.query, countNumberDocuments)


  const productList = await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip)

  res.render('admin/pages/products/recover.pug', {
    pageTitle: "Xóa gần đây",
    products: productList,
    filterButtons: filterStatus,
    keywordSearch: objectSearch.keyword,
    objectPagination: objectPagination
  })
}

//recover product
module.exports.recoverProduct = async (req, res) => {
  const productId = req.params.id;

  await products.updateOne({
    _id: productId
  }, {
    deleted: false,
  });
  res.redirect(req.get("referer"))
}

//delete permently
module.exports.deletePermanently=async(req,res)=>{
  const productId=req.params.id;
  await products.deleteOne({_id:productId});
  res.redirect(req.get("referer"))
}