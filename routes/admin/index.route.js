const dashBoard=require('./dashboard.route')
const products=require('./products.route')
const systemconfig=require('../../config/system');
const productCategory=require('./productCategory')
const roles=require('./roles.route')
const accounts=require('./accounts.route')
const auth=require('./auth.route')
const myAccount=require('./my-account.route')
const authMiddlewrare=require('../../middleware/admin/auth.middleware')

module.exports=(app)=>{
  const PATH_ADMIN=systemconfig.PrefixAdmin  
  app.use(`${PATH_ADMIN}/dashboard`,authMiddlewrare.requireAuth,dashBoard)
  app.use(`${PATH_ADMIN}/products`,authMiddlewrare.requireAuth,products)
  app.use(`${PATH_ADMIN}/product-category`,authMiddlewrare.requireAuth,productCategory)
  app.use(`${PATH_ADMIN}/roles`,authMiddlewrare.requireAuth,roles)
  app.use(`${PATH_ADMIN}/accounts`,authMiddlewrare.requireAuth,accounts)
  app.use(`${PATH_ADMIN}/auth`,auth)
  app.use(`${PATH_ADMIN}/my-account`,authMiddlewrare.requireAuth,myAccount)
}