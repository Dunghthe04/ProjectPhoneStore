//Search by status(1)
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