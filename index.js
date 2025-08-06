const express=require('express')
const app=express()

//env
require('dotenv').config()
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


