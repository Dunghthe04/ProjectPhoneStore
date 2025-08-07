const dashBoard=require('./dashboard.route')
const products=require('./products.route')
const systemconfig=require('../../config/system');

module.exports=(app)=>{
  const PATH_ADMIN=systemconfig.PrefixAdmin  
  app.use(`${PATH_ADMIN}/dashboard`,dashBoard)
  app.use(`${PATH_ADMIN}/products`,products)
}