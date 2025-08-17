//Fillter by status(1)
const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusValue = button.getAttribute("button-status");
            if (statusValue) {
                url.searchParams.set("status", statusValue);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}

//Search by name
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const valueSearch = e.target.elements.keyword.value;
        if (valueSearch) {
            url.searchParams.set("keyword", valueSearch);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

//pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}

// check-box-multi
const checkBoxMulti = document.querySelector("[check-box-multi]");
if (checkBoxMulti) {
    //lấy ra nút check all 
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    //lấy ra các ô check của sp
    const inputCheckId = checkBoxMulti.querySelectorAll("input[name='id']");

    //ktra nếu ấn nút check all
    inputCheckAll.addEventListener("click", () => {
        //nếu là check
        if (inputCheckAll.checked) {
            inputCheckId.forEach(inputCheckAll => {
                inputCheckAll.checked = true;
            })
        } else {
            inputCheckId.forEach(inputCheckAll => {
                inputCheckAll.checked = false;
            })
        }
    })

    //nếu click đủ nút(đếm) -> nút checkAll được chọn (đếm số lượng input được check -> so sánh nếu == inputCheckId.length -> nút checkAll check)
    inputCheckId.forEach(input => {
        input.addEventListener("click", () => {
            // môi khi ấn -> check xem == số lượng ptu chua
            const numberInputCheck = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if (numberInputCheck == inputCheckId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        //lấy ra các ô input check -> lấy value(id của sp) của ô đó gộp lại cho vào input của form
        const checkBoxMulti = document.querySelector("[check-box-multi]");
        //lấy ra các ô input check
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        if (inputChecked.length > 0) {
            let ids = []; // mảng chứa các id 
            //lấy ra ô input id của form
            const inputForm = formChangeMulti.querySelector("input[name='ids']");
            inputChecked.forEach(input => {
                const idProduct = input.value;
                ids.push(idProduct);
            });
            inputForm.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
        }
    })
}

//delete
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDelete = document.querySelector("#formDelete");
    const path = formDelete.getAttribute("path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa");
            if (isConfirm) {
                const productId = button.getAttribute("data-id");
                const action = path + `/${productId}?_method=DELETE`
                formDelete.action = action;
                formDelete.submit();
            }

        })
    })
}

//recover
const buttonRecover = document.querySelectorAll("[button-recover]");
if (buttonRecover.length > 0) {
    const formRecover = document.querySelector("#formRecover");
    const path = formRecover.getAttribute("path");
    buttonRecover.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn khôi phục");
            if (isConfirm) {
                const productId = button.getAttribute("data-id");
                const action = path + `/${productId}?_method=PATCH`
                formDelete.action = action;
                formDelete.submit();
            }

        })
    })
}
//end recover
//deletePermanently
const deletePermanently = document.querySelectorAll("[button-delete-permently]");
if (deletePermanently.length > 0) {
    const formDelete = document.querySelector("#formDelete");
    const path = formDelete.getAttribute("path");
    deletePermanently.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa vĩnh viễn");
            if (isConfirm) {
                const productId = button.getAttribute("data-id");
                const action = path + `/${productId}?_method=DELETE`
                formDelete.action = action;
                formDelete.submit();
            }

        })
    })
}
//end deletePermanently
