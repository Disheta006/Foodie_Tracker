const orderButton = document.getElementById("order-btn")
const status = document.getElementById("status-el")
let orderCompleted = false

function placeOrder() {
    return new Promise((resolve) => {
        status.textContent = "Status: Order placed!"
        setTimeout(() => {
            status.textContent = "Status: Restaurant confirmed!"
            resolve("Restaurant confirmed!")
        }, 2000)
    })
}

function prepareFood() {
    return new Promise((resolve) => {
        status.textContent = "Status: Preparing food..."
        setTimeout(() => {
            status.textContent = "Status: Food ready!"
            resolve("Food ready!")
        }, 3000)
    })
}

function packFood() {
    return new Promise((resolve) => {
        status.textContent = "Status: Packing food..."
        setTimeout(() => {
            status.textContent = "Status: Food packed"
            resolve("Food packed")
        }, 2000)
    })
}

function assignRider() {
    return new Promise((resolve, reject) => {
        status.textContent = "Status: Finding delivery partner..."
        setTimeout(() => {
            const isRiderAssigned = Math.random() > 0.5
            if(isRiderAssigned) {
                status.textContent = "Status: Delivery partner assigned"
                resolve("Delivery partner assigned")
            } else {
                status.textContent = "Status: No delivery partner available"
                reject(new Error("No delivery partner available"))
            }
        }, 2000)
    })
}

function deliverOrder() {
    return new Promise((resolve) => {
        status.textContent = "Status: Out for delivery"
        setTimeout(() => {
            status.textContent = "Status: Order delivered!"
            orderCompleted = true
            orderButton.textContent = "PLACE ANOTHER ORDER"
            resolve("Order delivered!")
        }, 3000)
    })
}

orderButton.addEventListener("click", () => {
    if(orderCompleted) {
        orderCompleted = false
        status.textContent = "Status: Ready to order"
        orderButton.textContent = "PLACE ORDER"
    } else {
        placeOrder().then((message) => {
            console.log(message)
            return prepareFood()
        }).then((message) => {
            console.log(message)
            return packFood()
        }).then((message) => {
            console.log(message)
            return assignRider()
        }).then((message) => {
            console.log(message)
            return deliverOrder()
        }).catch((error) => {
            console.log(error.message)
            status.textContent = error.message
            orderButton.textContent = "TRY AGAIN"
        }).finally(() => {
            status.textContent = "Status: Order process completed"
        })
    }
})