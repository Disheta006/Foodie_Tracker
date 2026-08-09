const orderButton = document.getElementById("order-btn")
const status = document.getElementById("status-el")
const stepOrder = document.getElementById("step-order")
const stepFood = document.getElementById("step-food")
const stepPack = document.getElementById("step-pack")
const stepRider = document.getElementById("step-rider")
const stepDelivery = document.getElementById("step-delivery")
const progressLineFill = document.getElementById("progress-line-fill")
const customer = document.getElementById("customer-el")
const food = document.getElementById("food-el")
const foodSelect = document.getElementById('food-select')

const order = {
    customer: "Rahul",
    food: "Pizza"
}
let orderStatus = "ready"

function displayOrder() {
    customer.textContent = order.customer
    food.textContent = order.food
}

foodSelect.addEventListener("change", () => {
    order.food = foodSelect.value
    displayOrder()
})

function updateProgress(step, state = "active") {
    const steps = [
        stepOrder,
        stepFood,
        stepPack,
        stepRider,
        stepDelivery
    ]
    const stepIndex = {
        order: 0,
        food: 1,
        pack: 2,
        rider: 3,
        delivery: 4
    }
    steps.forEach((element, index) => {
        element.classList.remove("active","completed", "failed")
        const icon = element.querySelector(".step-icon")
        if(index < stepIndex[step]) {
            element.classList.add("completed")
        }
        if (index === stepIndex[step]) {
            element.classList.add(state)
            if (state === "active") {
                icon.textContent = "●"
            }
            else if (state === "failed") {
                icon.textContent = "✕"
            }
        }
        else {
            icon.textContent = "○"
        }
    })
    const currentIndex = stepIndex[step]
    let completedIndex = currentIndex
    if (state === "active") {
        completedIndex = currentIndex - 1
    }
    if (state === "failed") {
        completedIndex = currentIndex - 1
    }
    if (completedIndex < 0) {
        completedIndex = 0
    }
    const progressPercentage = (currentIndex / (steps.length - 1))*100
    progressLineFill.style.height = `${progressPercentage}%`
}

function resetProgress() {
    progressLineFill.style.height = "0%"
    const steps = [
        stepOrder,
        stepFood,
        stepPack,
        stepRider,
        stepDelivery
    ]
    steps.forEach((element, index) => {
        element.classList.remove("active","completed", "failed")
        const icon = element.querySelector(".step-icon")
        icon.textContent = "○"
    })
    
}
resetProgress()

function updateStatus(message) {
    status.textContent = `${message}`
}

function updateButton() {
    if (orderStatus === "ready") {
        orderButton.textContent = "PLACE ORDER"
        orderButton.disabled = false
        foodSelect.disabled = false
    } else if (orderStatus === "processing") {
        orderButton.textContent = "PROCESSING..."
        orderButton.disabled = true
        foodSelect.disabled = true
    } else if (orderStatus === "completed") {
        orderButton.textContent = "PLACE ANOTHER ORDER"
        orderButton.disabled = false
        foodSelect.disabled = false
    } else if (orderStatus === "failed") {
        orderButton.textContent = "TRY AGAIN"
        orderButton.disabled = false
        foodSelect.disabled = false
    }
}
updateButton()

function placeOrder() {
    return new Promise((resolve) => {
        updateStatus("Order placed!")
        updateProgress("order")
        setTimeout(() => {
           updateStatus("Restaurant confirmed!")
            resolve("Restaurant confirmed!")
        }, 2000)
    })
}

function prepareFood() {
    return new Promise((resolve) => {
        updateStatus("Preparing food...")
        updateProgress("food")
        setTimeout(() => {
                updateStatus("Food ready!")
                resolve("Food ready!")
        }, 3000)
    })
}

function packFood() {
    return new Promise((resolve) => {
        updateStatus("Packing food...")
        updateProgress("pack")
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
                updateProgress("rider")
                resolve("Delivery partner assigned")
            } else {
                updateStatus("No delivery partner available")
                updateProgress("rider", "failed")
                reject(new Error("No delivery partner available"))
            }
        }, 2000)
    })
}

function deliverOrder() {
    return new Promise((resolve) => {
        updateStatus("Out for delivery")
        updateProgress("delivery")
        setTimeout(() => {
            updateStatus("Order delivered!")
            updateProgress("delivery", "completed")
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
        resetProgress()
    } else if (orderStatus === "failed" || orderStatus === "ready") {
        processOrder()
    }
})