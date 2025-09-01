const mongoose = require('mongoose')
const randomToken=require('../helpers/randomToken');
const accountSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token:{
        type: String,
        default: randomToken.randomToken(20)
    } ,
    phone: String,
    avatar: {
        type: String,
        default:""
    },
    role_id: String,
    status: String,  
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{timestamps: true})

const Account=mongoose.model("Account",accountSchema,"accounts");
module.exports=Account;