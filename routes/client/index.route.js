const routeHome=require('./home.route')
const routeproducts=require('./products.route')
const routeSearch=require('./search.route')
const routeCart=require('./cart.route')
const middlewareProductcategory=require('../../middleware/client/product-category.middleware')
const middlewareCart=require('../../middleware/client/cart.middelware')

module.exports=(app)=>{
  //thêm middleware để các trang kế thừa đc defaut*vì default cần productCategory)
  app.use(middlewareProductcategory.productcategory)// tất cả route đều qua middleware này
  //thêm middleware cartId cho tất cả trang client
  app.use(middlewareCart.cart)
  app.use('/',routeHome)
  app.use('/products',routeproducts)
  app.use('/search',routeSearch)
  app.use('/cart',routeCart)
}