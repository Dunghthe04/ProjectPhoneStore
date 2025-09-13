// mục tiêu trả về 1 mảng mới có giá đã giảm
module.exports.newPriceArray=(listProduct)=>{
    const newProducts=listProduct.map(item=>{
     item.newPrice=(item.price - (item.price*(item.discountPercentage/100))).toFixed(0);
     return item;
   })

   return newProducts
}
//lấy giá mới cho 1 sản phẩm, là 1 object truyền vào đây và đổi giá luôn
module.exports.newPrice=(product)=>{
     const newPrice=(product.price - (product.price*(product.discountPercentage/100))).toFixed(0);
     return parseInt(newPrice)
}