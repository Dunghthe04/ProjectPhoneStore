const products = require('../../models/product.model')
const filterHelper = require('../../helpers/FilterByStatus')
const searchHelper = require('../../helpers/searchByKeyword')
const paginationHelper = require('../../helpers/pagination')
const config=require("../../config/system")
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


  const productList = await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip).sort({position: "desc"})

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
  req.flash("success","Thay đổi trạng thái thành công");

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
      req.flash("success",`Thay đổi thành công ${productsIdChange.length} sản phẩm`);
      break;
    case 'inactive':
      await products.updateMany({
        _id: {
          $in: productsIdChange
        }
      }, {
        status: type
      })
      req.flash("success",`Thay đổi thành công ${productsIdChange.length} sản phẩm`);
      break;

     case 'deleteAll':
      await products.updateMany({
        _id: {
          $in: productsIdChange
        }
      }, {
        deleted: true,
        deletedAt: new Date()
      })  
      req.flash("success",`Xóa thành công ${productsIdChange.length} sản phẩm`);
      break;
    case 'recoverAll':
      await products.updateMany({
        _id: {
          $in: productsIdChange
        }
      }, {
        deleted: false,
      })  
      req.flash("success",`Khôi phục thành công ${productsIdChange.length} sản phẩm`);
      break; 
    case 'changePosition':
      for (let ele of productsIdChange) {
        const [id,position]=ele.split("-");
        
        await products.updateMany({
        _id: id
        }, {
          position: position,
        })  
      }
      req.flash("success",`Thay đổi vị trí thành công ${productsIdChange.length} sản phẩm`);
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
  req.flash("success",`Xóa thành công sản phẩm ${productId}`);
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
  req.flash("success",`Khôi phục thành công sản phẩm ${productId}`);
  res.redirect(req.get("referer"))
}

//delete permently
module.exports.deletePermanently=async(req,res)=>{
  const productId=req.params.id;
  await products.deleteOne({_id:productId});
  req.flash("success",`Đã xóa vĩnh viễn sản phẩm ${productId}`);
  res.redirect(req.get("referer"))
}

//create product(render index)
module.exports.create=async(req,res)=>{
  res.render("admin/pages/products/create.pug",{
    pageTitle: "Trang tạo mới sản phẩm"
  })
}

//Create product post
module.exports.createPost=async(req,res)=>{
   req.body.price=parseInt(req.body.price);
   req.body.discountPercentage=parseInt(req.body.discountPercentage);
   req.body.stock=parseInt(req.body.stock);

  //nếu k nhập postion -> đếm rồi +1 
  if(req.body.position===""){
    const numberOfProduct=await products.countDocuments();
    req.body.position=numberOfProduct+1;
  }else{
    req.body.position=req.body.position;
  }
  
   // lưu đường dẫn ảnh
   if(req.file){
    req.body.thumbnail=`/upload/${req.file.filename}`
   }
   
  //tạo product với thông tin trong req.body, rồi lưu vào database
  const product=new products(req.body);
  product.save();

  req.flash("success","Thêm 1 sản phẩm thành công")
  res.redirect(`${config.PrefixAdmin}/products`)
}
