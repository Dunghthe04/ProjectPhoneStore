const express=require('express')
//env
require('dotenv').config()


//database config(mongoose connect to database)
const database=require('./config/database')
database.connect();

const app=express()
const port=process.env.PORT
//route
const clientRoute=require('./routes/client/index.route.js')

//pug 
app.set('views','./views')
app.set('view engine','pug')

//static file
app.use(express.static("public"));

clientRoute(app);

app.listen(port,()=>{
     console.log(`Example app listening on port ${port}`)
})


