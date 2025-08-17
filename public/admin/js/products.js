//Change-status-product
const buttonsChangeStatus=document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length>0){
    const formChangeStatus=document.querySelector("#formChangeStatus");
    const path=formChangeStatus.getAttribute("path");

    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusProduct=button.getAttribute("data-status");
            const idProduct=button.getAttribute("data-id");

            let newStatus=statusProduct=="active"?"inactive":"active";
            const action=path+`/${newStatus}/${idProduct}?_method=PATCH`
            formChangeStatus.action=action;
            formChangeStatus.submit();
        })
    })
}
//End Change-status-product


