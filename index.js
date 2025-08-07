const express=require('express')
//env
require('dotenv').config()
//config
const systemconfig=require('./config/system.js')

//database config(mongoose connect to database)
const database=require('./config/database')
database.connect();

const app=express()
const port=process.env.PORT
//route
const clientRoute=require('./routes/client/index.route.js')
const adminRoute=require('./routes/admin/index.route.js')
//pug 
app.set('views','./views')
app.set('view engine','pug')

//static file
app.use(express.static("public"));

//local variable(bien naydung duoc moij file pug)
app.locals.prefixAdmin=systemconfig.PrefixAdmin;
clientRoute(app);
adminRoute(app);

app.listen(port,()=>{
     console.log(`Example app listening on port ${port}`)
})


