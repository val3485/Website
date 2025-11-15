let tempCustDetails = [];
let CustomerDetails = [];

function tempCustomerDet() {
    tempCustDetails = JSON.parse(localStorage.getItem('tempCustDetails')) || [];
}

function getCustDet() {
    CustomerDetails = JSON.parse(localStorage.getItem('CustomerDetails')) || [];
}

function saveDetails () {
    localStorage.setItem('CustomerDetails', JSON.stringify(CustomerDetails));
}

function tempSaveDetails() {
    localStorage.setItem('tempCustDetails', JSON.stringify(tempCustDetails));
}


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
    localStorage.setItem('cartItems', JSON.stringify([])); //clears cart array
    localStorage.setItem('tempCustDetails', JSON.stringify([])); //clears temp customer details array
    
    alert(`Order Placed Successfully! Order ID: ${newOrder.orderID}`);

}

document.addEventListener("DOMContentLoaded", () => {
    const placed = document.getElementById('proceed-bttn');
    placed.addEventListener("click", placeOrder);
});

document.addEventListener("DOMContentLoaded", () => {
    getStorage();
        let orderContainer = ' ';

        cartItems.forEach((item) => {
            const matchingProduct = products.find(product => product.id === item.id);

            if (!matchingProduct) {
            alert("Product not found for cart item:", item);
            return; // skip this item
            }

            const itemTotal = matchingProduct.price * item.quantity;
            total += itemTotal;
            
            orderContainer +=
            `<div class = "checkout-item">
                <div class = "merge">
                    <img class = "item-image" src = "${matchingProduct.image}">
                    <p class = "item-name">${matchingProduct.name}</p>
                </div>

                <p class = "item-price">${matchingProduct.price}</p>
                <div class = "quantity-controls">
                    <p class = "item-quantity">${item.quantity}</p>
                </div>
                <p class = "item-total">Php.  ${(matchingProduct.price * item.quantity).toFixed(2)}</p>
            </div>   
            `;
            
            if (item.quantity <=0){
                removeItem(item.id);
            }

        })

    if (cartItems.length > 0) {
        document.getElementById('details').innerHTML = orderContainer;
    } else {
        document.getElementById('details').innerHTML = '<p class = "empty">No orders! Add to cart now! :<<</p>';
    }

    document.querySelector('.total').innerText = `YOUR TOTAL AMOUNT IS: Php. ${total.toFixed(2)}`;
    console.log(total);

});


document.addEventListener("DOMContentLoaded", () => {
    tempCustomerDet();
    let customerContainer = ' ';

    const cust = tempCustDetails[0];

        customerContainer = `
                <table class = "customer-table">
                    <tr>
                        <td>Customer's Name: </td>
                        <td>${cust.Name}</td>
                    </tr>

                    <tr>
                        <td>Contact Number: </td>
                        <td>${cust.ContactNumber}</td>
                    </tr>

                    <tr>
                        <td>Delivery Address: </td>
                        <td>${cust.Address}</td>
                    </tr>

                    <tr>
                        <td>Message to Seller: </td>
                        <td>${cust.Message}</td>
                    </tr>
                </table>
            `;


    document.querySelector('#cust-table').innerHTML = customerContainer;
});

