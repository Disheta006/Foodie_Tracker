const orderButton = document.getElementById("order-btn")
const status = document.getElementById("status-el")
let orderCompleted = false

orderButton.addEventListener("click", function() {
    if(orderCompleted) {
        orderCompleted = false
        status.textContent = "Status: Ready to order"
        orderButton.textContent = "PLACE ORDER"
    }
    else {
        status.textContent += " Order placed!"
        setTimeout(() => {
            status.textContent += " Preparing food.."
            setTimeout(() => {
                status.textContent += " Food ready!"
                orderCompleted = true
                orderButton.textContent = "PLACE ANOTHER ORDER"
            }, 3000)
        }, 2000)
    }
})
