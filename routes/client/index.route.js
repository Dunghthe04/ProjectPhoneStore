const routeHome=require('./home.route')
const routeproducts=require('./products.route')
const routeSearch=require('./search.route')
const middlewareProductcategory=require('../../middleware/client/product-category.middleware')
module.exports=(app)=>{
  //thêm middleware để các trang kế thừa đc defaut*vì default cần productCategory)
  app.use(middlewareProductcategory.productcategory)// tất cả route đều qua middleware này
  app.use('/',routeHome)
  app.use('/products',routeproducts)
  app.use('/search',routeSearch)
}