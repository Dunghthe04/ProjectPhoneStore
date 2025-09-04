const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsSchema = mongoose.Schema({
  title: String,
  category: {
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  slug: {
    type: String,
    slug: "title",
    unique: true

  },
  position: Number,
  deleted: {
    type: Boolean,
    default: false,
  },
  createBy: {
    account_id: String,
    createAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedBy: {
    account_id: String,
    deletedDate: Date
  },
  //vì nhiều người update -> lưu dạng mảng, mảng đó chứa nhiều object
  updateBy: [
    {
      account_id: String,
      updateDate: Date
    }
  ],
  deletedAt: Date
}, {
  timestamps: true
})

const Product = mongoose.model("Product", productsSchema, "products");
module.exports = Product;