const orderButton = document.getElementById("order-btn")
const status = document.getElementById("status-el")
let orderStatus = "ready"

function updateStatus(message) {
    status.textContent = `${message}`
}

function updateButton() {
    if (orderStatus === "ready") {
        orderButton.textContent = "PLACE ORDER"
        orderButton.disabled = false
    } else if (orderStatus === "processing") {
        orderButton.textContent = "PROCESSING..."
        orderButton.disabled = true
    } else if (orderStatus === "completed") {
        orderButton.textContent = "PLACE ANOTHER ORDER"
        orderButton.disabled = false
    } else if (orderStatus === "failed") {
        orderButton.textContent = "TRY AGAIN"
        orderButton.disabled = false
    }
}
updateButton()

function placeOrder() {
    return new Promise((resolve) => {
        updateStatus("Order placed!")
        setTimeout(() => {
           updateStatus("Restaurant confirmed!")
            resolve("Restaurant confirmed!")
        }, 2000)
    })
}

function prepareFood() {
    return new Promise((resolve) => {
        updateStatus("Preparing food...")
        setTimeout(() => {
                updateStatus("Food ready!")
                resolve("Food ready!")
        }, 3000)
    })
}

function packFood() {
    return new Promise((resolve) => {
        updateStatus("Packing food...")
        setTimeout(() => {
                updateStatus("Food packed")
                resolve("Food packed")
        }, 2000)
    })
}

function assignRider() {
    return new Promise((resolve, reject) => {
        updateStatus("Finding delivery partner...")
        setTimeout(() => {
            const isRiderAssigned = Math.random() > 0.5
            if(isRiderAssigned) {
                updateStatus("Delivery partner assigned")
                resolve("Delivery partner assigned")
            } else {
                updateStatus("No delivery partner available")
                reject(new Error("No delivery partner available"))
            }
        }, 2000)
    })
}

function deliverOrder() {
    return new Promise((resolve) => {
        updateStatus("Out for delivery")
        setTimeout(() => {
            updateStatus("Order delivered!")
            orderStatus = "completed"
            updateButton()
            resolve("Order delivered!")
        }, 3000)
    })
}

async function processOrder() {
    orderStatus = "processing"
    updateButton()
    try {
        const message = await placeOrder()
        console.log(message)
        const foodMessage = await prepareFood()
        console.log(foodMessage)
        const packedMessage = await packFood()
        console.log(packedMessage)
        const riderMessage = await assignRider()
        console.log(riderMessage)
        const deliveryMessage = await deliverOrder()
        console.log(deliveryMessage)
    } catch(error) {
        console.log(error.message)
        orderStatus = "failed"
        updateStatus(error.message)
        updateButton()
    } finally {
        console.log("Order Process Completed")
    }
}

orderButton.addEventListener("click", () => {
    if(orderStatus === "completed") {
        orderStatus = "ready"
        updateStatus("Ready to order")
        updateButton()
    } else if (orderStatus === "failed" || orderStatus === "ready") {
        processOrder()
    }
})