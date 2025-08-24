const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = mongoose.Schema({
    title: String,
    parrent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    position: Number,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
},{timestamps: true})

const ProductCategory=mongoose.model("ProductCategory",productCategorySchema,"product-category");
module.exports=ProductCategory;