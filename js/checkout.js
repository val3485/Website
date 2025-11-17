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

//for displaying order
document.addEventListener("DOMContentLoaded", () => {
    getStorage();
        let orderContainer = ' ';

        cartItems.forEach((item) => {
            const matchingProduct = products.find(product => product.id === item.id);

            if (!matchingProduct) {
            alert("Product not found for cart item:", item);
            return; // skip this item
            }

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

});

//for displaying customer details
document.addEventListener("DOMContentLoaded", () => {
    tempCustomerDet();
    let customerContainer = ' ';

    const cust = tempCustDetails[0];

        customerContainer = `
                <table class = "customer-table">
                    <tr>
                        <td>Customer's Name: </td>
                    </tr>

                    <tr>
                        <td class = "det" >${cust.Name}</td>
                    </tr>

                    <tr>
                        <td>Contact Number: </td>
                    </tr>

                    <tr>
                        <td class = "det">${cust.ContactNumber}</td>
                    </tr>

                    <tr>
                        <td>Delivery Address: </td>
                    </tr>

                    <tr>
                        <td class = "det">${cust.Address}</td>
                    </tr>

                    <tr>
                        <td>Message to Seller: </td>
                    </tr>
                    
                    <tr>
                    <td class = "det">${cust.Message}</td>
                    </tr>

                </table>
            `;


    document.querySelector('#cust-table').innerHTML = customerContainer;
});

//go back to cart
document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById('cart-back');

    back.addEventListener("click", () => {
        window.location.href = "./cart.html";
        localStorage.setItem('tempCustDetails', JSON.stringify([]));
    });

});

//placing order and showing receipt
document.addEventListener("DOMContentLoaded", () => {
    
    const receipt = document.getElementById('receipt');
    const place = document.getElementById('proceed-bttn');
    const placed = document.getElementById('place-order');
    
    let placedContainer = ' ';
    let receiptContainer = ' ';
    
    place.addEventListener("click", () => {
        getStorage();
        placedItems();
        tempCustomerDet();

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
        
        const ID = newOrder.orderID;
            placedContainer = `
                <div id = "placed">
                    <p>ORDER PLACED!</p>
                    <p>Order ID: ${newOrder.orderID}</p>
                    <button id = "show-receipt">PROCEED TO RECEIPT</button>
                </div>
            `
        
         
        placed.innerHTML = placedContainer;
        placed.style.display = "block";
        
        const receiptBttn = document.getElementById('show-receipt');

        receiptBttn.addEventListener("click", () => {
            getStorage();
            tempCustomerDet();
                let total = 0;
                let subtotal = 0;
                cartItems.forEach((item) => {
                    const matchingProduct = products.find(product => product.id === item.id);
                    const itemTotal = matchingProduct.price * item.quantity;
                    const subTotal = matchingProduct.price - (matchingProduct * 0.12);
                    subtotal += subTotal;
                    total += itemTotal;
                    console.log(matchingProduct);

                });
            const cust = tempCustDetails[0];
                receiptContainer = `
                    <div class = "receipt-det">
                    <h2>THANK YOU FOR PURCHASING IN OUR SHOP!</h2>

                    <div id = "customer-det">
                        <table class = "customer-table">
                            <tr>
                                <td>Customer's Name: </td>
                            </tr>

                            <tr>
                                <td class = "det" >${cust.Name}</td>
                            </tr>

                            <tr>
                                <td>Contact Number: </td>
                            </tr>

                            <tr>
                                <td class = "det">${cust.ContactNumber}</td>
                            </tr>

                            <tr>
                                <td>Delivery Address: </td>
                            </tr>

                            <tr>
                                <td class = "det">${cust.Address}</td>
                            </tr>

                            <tr>
                                <td>Message to Seller: </td>
                            </tr>
                            
                            <tr>
                            <td class = "det">${cust.Message}</td>
                            </tr>

                        </table>

                        
                    </div>

                    <p>----------------------------------------</p>

                    <p id = "items">ITEMS: </p>
                    <div id = "purchased"></div>

                    <p>----------------------------------------</p>

                    <div id = "amount">
                        <p id = "subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
                        <h4 id = "Total">TOTAL AMOUNT: Php.  ${total.toFixed(2)}</h4>
                    </div>
                    <p>(Please take a screenshot of this receipt for future purposes.)</p>
                    <button class = "end-bttn">CLOSE</button>
                    </div>
                `
                receipt.innerHTML = receiptContainer;
            
                receipt.style.display = "block";

            
        });


        
    
    });
 console.log(document.querySelector('receipt-det'));
    window.addEventListener("click", (e) => {
        if(e.target == placed) placed.style.display = "none";
    });
});

