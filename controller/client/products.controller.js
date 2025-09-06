const Product = require('../../models/product.model')
const ProductCategory = require('../../models/productCategory.model')
const getSubcategoryHelpers = require('../../helpers/GetSubCategoryByParrentId')
const getNewPriceHelper = require('../../helpers/newPriceProduct')
//index
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({
    position: "desc"
  });


  const newProducts = products.map(item => {
    item.newPrice = (item.price - (item.price * (item.discountPercentage / 100))).toFixed(0);
    return item;
  })
  res.render("client/pages/products/index", {
    pageTitle: "Trang danhs sach san pham",
    products: newProducts
  })
}

//detail
module.exports.detail = async (req, res) => {
  try {
    const find = {
      status: "active",
      slug: req.params.slug,
      deleted: false
    }
    const product = await Product.findOne(find);

    if (product.category) {
      const category = await ProductCategory.findOne({
        _id: product.category,
        deleted: false,
        status: "active"
      })
      product.category = category
    }
    product.newPrice= getNewPriceHelper.newPrice(product);

    console.log(product);
    
    res.render('client/pages/products/detail.pug', {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    })

  } catch (error) {
    res.redirect("/products")
  }
}

//lấy tất cả sản phẩm dựa trên category
module.exports.categoryfilter = async (req, res) => {
  try {
    const slugCategory = req.params.slugCategory;
    console.log(slugCategory);

    //lấy ra categoryId dựa trên slugcategory
    const category = await ProductCategory.findOne({
      deleted: false,
      slug: slugCategory,
      status: "active"
    })
    const categoryId = category.id;

    //lấy ra các sản phẩm dựa trên categoryId đó, và lấy cả các sản phẩm bên trong danh mục con-con con của nó nữa
    //vd : điện thoại -> lấy all sản phẩm của cả iphone(danh mục iphone) va cả samsumg(dmuc: sámung)
    //lấy ra mảng categoryCon dựa trên categiory ng dùng bấm
    const subCategory = await getSubcategoryHelpers.getSubcategory(categoryId);
    console.log(subCategory);

    //lấy ra mảng id của categiorycon đó
    const subcategoryid = subCategory.map(sub => sub.id)

    //giờ lấy sản phẩm dựa trên category ng dùng chọn, và các product của category con của nó: vd điện thoại -> thì lấy all sp của cả iphone, ss,..
    const productByCategory = await Product.find({
      deleted: false,
      status: "active",
      category: {
        $in: [categoryId, ...subcategoryid]
      }
    })

    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: productByCategory
    })
  } catch (error) {
    res.redirect("/products")
  }
}