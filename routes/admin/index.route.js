const dashBoard=require('./dashboard.route')
const products=require('./products.route')
const systemconfig=require('../../config/system');
const productCategory=require('./productCategory')
const roles=require('./roles.route')
const accounts=require('./accounts.route')

module.exports=(app)=>{
  const PATH_ADMIN=systemconfig.PrefixAdmin  
  app.use(`${PATH_ADMIN}/dashboard`,dashBoard)
  app.use(`${PATH_ADMIN}/products`,products)
  app.use(`${PATH_ADMIN}/product-category`,productCategory)
  app.use(`${PATH_ADMIN}/roles`,roles)
  app.use(`${PATH_ADMIN}/accounts`,accounts)
}