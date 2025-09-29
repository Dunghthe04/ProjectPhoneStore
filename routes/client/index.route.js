const routeHome=require('./home.route')
const routeproducts=require('./products.route')
const routeSearch=require('./search.route')
const routeCart=require('./cart.route')
const routeCheckout=require('./checkout.route')
const userCheckout=require('./user.route')
const middlewareProductcategory=require('../../middleware/client/product-category.middleware')
const middlewareCart=require('../../middleware/client/cart.middelware')
const middlewareSetting=require('../../middleware/client/setting.middleware')
const middlewareInforUser=require('../../middleware/client/user.middleware')

module.exports=(app)=>{
  //thêm middleware để các trang kế thừa đc defaut*vì default cần productCategory)
  app.use(middlewareProductcategory.productcategory)// tất cả route đều qua middleware này
  //thêm middleware cartId cho tất cả trang client
  app.use(middlewareCart.cart)
  //thêm middleware inforuser, vì nó nằm trên header
  app.use(middlewareInforUser.inforUser)
  //thêm middelware setting của admin để hiển thị logo
  app.use(middlewareSetting.setting)
  
  app.use('/',routeHome)
  app.use('/cart',routeCart)
  app.use('/products',routeproducts)
  app.use('/search',routeSearch)
  app.use('/checkout',routeCheckout)
  app.use('/user',userCheckout)

}