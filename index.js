const express=require('express')
//env
require('dotenv').config()
//config
const systemconfig=require('./config/system.js')
//method_override(dùng để ghi đè pthuc gửi form lên)
const methodOverride = require('method-override')

//body-parser(dùng để lấy dữ liệu trong req.body)
const bodyParser = require('body-parser')
//database config(mongoose connect to database)
const database=require('./config/database')
database.connect();

const app=express()
const port=process.env.PORT
//route
const clientRoute=require('./routes/client/index.route.js')
const adminRoute=require('./routes/admin/index.route.js')
//body-parser
app.use(bodyParser.urlencoded())
// app.use(bodyParser.urlencoded({extended: false}))
//method_override
app.use(methodOverride('_method'))
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


