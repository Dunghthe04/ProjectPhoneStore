//Fillter by status(1)
const buttonStatus=document.querySelectorAll("[button-status]")
if(buttonStatus.length>0){
    let url=new URL(window.location.href);
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusValue=button.getAttribute("button-status");
            if(statusValue){
                url.searchParams.set("status",statusValue);
            }else{
                url.searchParams.delete("status");
            }
            window.location.href=url.href;
        })
    })
}

//Search by name
const formSearch=document.querySelector("#form-search")
if(formSearch){
   let url=new URL(window.location.href);
   formSearch.addEventListener("submit",(e)=>{
     e.preventDefault();
     const valueSearch=e.target.elements.keyword.value;
     if(valueSearch){
        url.searchParams.set("keyword",valueSearch);
     }else{
        url.searchParams.delete("keyword");
     }
     window.location.href=url.href;
   })     
}