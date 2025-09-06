const ProductCategory=require('../models/productCategory.model')
module.exports.getSubcategory=async(categoryParrentId)=>{
   const getCategory=async(categoryParrentId)=>{
         //lấy ra tất cả thằng category con của parrent kia
         const subCategory=await ProductCategory.find({
            deleted: false,
            status:"active",
            parrent_id:categoryParrentId
         })
         //dải tất cả các categorycon vào đây
         let allSubs=[...subCategory]

         //duyệt từng categoryCon
         for(const sub of subCategory){
            //vứt lại vào dệ quy để tìm con của nó(nếu có)
            const child=await getCategory(sub.id)
            //nó sẽ trả vê 1 mảng con của nó or rỗng
            allSubs=allSubs.concat(child)
         }

         return allSubs 
       } 
    const subCategory=await getCategory(categoryParrentId)
    return subCategory
}