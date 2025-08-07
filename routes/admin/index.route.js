const dashBoard=require('./dashboard.route')
const systemconfig=require('../../config/system');
module.exports=(app)=>{
  const PATH_ADMIN=systemconfig.PrefixAdmin  
  app.use(`${PATH_ADMIN}/dashboard`,dashBoard)
}