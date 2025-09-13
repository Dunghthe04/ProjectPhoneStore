//update quatity product in cart
const inputQuantity=document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0){
    //duyệt từng dòng
    inputQuantity.forEach(input =>{
        //thêm dự kiện change
        input.addEventListener("change",()=>{
            //cần sô lượng, id sản phẩm
            const productId=input.getAttribute("product-id");
            const quantity=input.value;

            //gửi đi
            window.location.href=`/cart/updatequantity/${productId}/${quantity}`
        })
    })
}