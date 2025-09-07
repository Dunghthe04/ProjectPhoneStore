const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        // sau 1 khoảng thời gian chạy-> ẩn đi
        showAlert.classList.add("alert-hidden");
    }, time)
}


//nút đóng
const closeAlertButton = document.querySelector("[close-alert]");
if (closeAlertButton) {
    closeAlertButton.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}