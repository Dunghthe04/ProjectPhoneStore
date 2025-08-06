const routeHome=require('./home.route')
const routeproducts=require('./products.route')
module.exports=(app)=>{
  app.use('/',routeHome)
  app.use('/products',routeproducts)
}