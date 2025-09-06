// mục tiêu trả về 1 mảng mới có giá đã giảm
module.exports.newPriceArray=(listProduct)=>{
    const newProducts=listProduct.map(item=>{
     item.newPrice=(item.price - (item.price*(item.discountPercentage/100))).toFixed(0);
     return item;
   })

   return newProducts
}