

function placeOrder(){
    getStorage();

    placedItems();

    if(cartItems.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const newOrder = {
        orderID: Date.now(),
        items: cartItems,
        date: new Date().toISOString()
    };

    allSales.push(newOrder);

    saveItems();
    console.log(newOrder);
    localStorage.setItem('cartItems', JSON.stringify([])); //clears cart array
    console.log(allSales);
    
    


    alert(`Order Placed Successfully! Order ID: ${newOrder.orderID}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const placed = document.getElementById('proceed-bttn');
    placed.addEventListener("click", placeOrder);
});

console.log(placedItems());