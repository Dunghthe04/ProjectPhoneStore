const express=require('express')
const app=express()
const port=9999
//route
const clientRoute=require('./routes/client/index.route.js')

//pug 
app.set('views','./views')
app.set('view engine','pug')


clientRoute(app);

app.listen(port,()=>{
     console.log(`Example app listening on port ${port}`)
})


