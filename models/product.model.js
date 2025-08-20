const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    slug:{
        type: String,
        slug: "title"
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
        unique: true
    },
    deletedAt: Date
},{timestamps: true})

const Product=mongoose.model("Product",productsSchema,"products");
module.exports=Product;