const orderButton = document.getElementById("order-btn")
const status = document.getElementById("status-el")
let orderCompleted = false

function placeOrder(callback) {
    status.textContent = "Status: Order placed!"
    setTimeout(() => {
        status.textContent = "Status: Restaurant confirmed!"
        callback()
    }, 2000)
}

function prepareFood(callback) {
    status.textContent = "Status: Preparing food..."
    setTimeout(() => {
        status.textContent = "Status: Food ready!"
        callback()
    }, 3000)
}

function packFood(callback) {
    status.textContent = "Status: Packing food..."
    setTimeout(() => {
        status.textContent = "Status: Food packed"
        callback()
    }, 2000)
}

function assignRider(successCallback, errorCallback) {
    status.textContent = "Status: Finding delivery partner..."
    setTimeout(() => {
    const isRiderAssigned = Math.random() > 0.5
    if(isRiderAssigned) {
        status.textContent = "Status: Delivery partner assigned"
        successCallback()
    } else {
        status.textContent = "Status: No delivery partner available"
        errorCallback()
    }
}, 2000)
}

function deliverOrder() {
    status.textContent = "Status: Out for delivery"
    setTimeout(() => {
        status.textContent = "Status: Order delivered!"
        orderCompleted = true
        orderButton.textContent = "PLACE ANOTHER ORDER"
    }, 3000)
}

orderButton.addEventListener("click", () => {
    if(orderCompleted) {
        orderCompleted = false
        status.textContent = "Status: Ready to order"
        orderButton.textContent = "PLACE ORDER"
    } else {
        placeOrder(() => {
            prepareFood(() => {
                packFood(() => {
                    assignRider(() => {
                        deliverOrder()
                    },
                () => {
                    status.textContent = "Status: No delivery partner avalible. Please try again"
                    orderButton.textContent = "TRY AGAIN"
            })
                })
            })
        })
    }
})