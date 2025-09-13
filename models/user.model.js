const mongoose = require('mongoose')
const randomToken=require('../helpers/randomToken');
const UserSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    userToken:{
        type: String,
        default: randomToken.randomToken(20)
    } ,
    phone: String,
    avatar: {
        type: String,
        default:""
    },
    status: {
        type:String,
        default:"active"
    },  
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{timestamps: true})

const User=mongoose.model("User",UserSchema,"users");
module.exports=User;