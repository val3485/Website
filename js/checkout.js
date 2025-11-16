let tempCustDetails = [];
let CustomerDetails = [];

//temporary array that holds one customer's details
function tempCustomerDet() {
    tempCustDetails = JSON.parse(localStorage.getItem('tempCustDetails')) || [];
}

//save
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

let newOrder = null;

//for displaying customer details
document.addEventListener("DOMContentLoaded", () => {
    tempCustomerDet();
    let customerContainer = ' ';

    const cust = tempCustDetails[0];

        customerContainer = `
                <table class = "customer-table">
                    <tr>
                        <td class = "det2">Customer's Name: </td>
                    </tr>

                    <tr>
                        <td class = "det" >${cust.Name}</td>
                    </tr>

                    <tr>
                        <td class = "det2">Contact Number: </td>
                    </tr>

                    <tr>
                        <td class = "det">${cust.ContactNumber}</td>
                    </tr>

                    <tr>
                        <td class = "det2">Delivery Address: </td>
                    </tr>

                    <tr>
                        <td class = "det">${cust.Address}</td>
                    </tr>

                    <tr>
                        <td class = "det2">Message to Seller: </td>
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
        
        tempCustomerDet();

        if(cartItems.length === 0) {
            alert("Cart is empty!");
            return;
        }
        
        newOrder = {
            customer: tempCustDetails[0],
            orderID: Date.now(),
            items: cartItems,
            date: new Date().toISOString()
        };

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

        // Remove previous listeners to avoid duplicates
        receiptBttn.replaceWith(receiptBttn.cloneNode(true));
        const newReceiptBttn = document.getElementById('show-receipt');

        newReceiptBttn.addEventListener("click", () => {
            getStorage();
            placedItems();
            tempCustomerDet();
                let total = 0;
                let subtotal = 0;
                cartItems.forEach((item) => {
                    const matchingProduct = products.find(product => product.id === item.id);
                    const itemTotal = matchingProduct.price * item.quantity;
                    const priceNoTax = matchingProduct.price / 1.12;
                    const subTotal = priceNoTax * item.quantity;
                    subtotal += subTotal;
                    total += itemTotal;

                });

                const itemListHTML = cartItems.map(item => {
                    const matchingProduct = products.find(product => product.id === item.id);
                    const total = (matchingProduct.price * item.quantity).toFixed(2);

                    return `
                        <tr>
                            
                            <td class = "details1">${matchingProduct.name} x ${item.quantity}</td>
                            <td class = "details1" style="text-align:right;">₱${total}</td>
                        </tr>
                    `;
                }).join("");


            const cust = tempCustDetails[0];
                receiptContainer = `
                    <div class = "receipt-det">
                    <h2>THANK YOU FOR PURCHASING IN OUR SHOP!</h2>

                    <div id = "customer-det">
                        <table class = "customer-details">
                            <tr>
                                <td class = "det1">Customer's Name: </td>
                                <td class = "details1" >${cust.Name}</td>
                            </tr>

                            <tr>
                                <td class = "det1">Contact Number: </td>
                                <td class = "details1">${cust.ContactNumber}</td>
                            </tr>

                            <tr>
                                <td class = "det1">Delivery Address: </td>
                                <td class = "details1">${cust.Address}</td>
                            </tr>

                            <tr>
                                <td class = "det1">Message to Seller: </td>
                                <td class = "details1">${cust.Message}</td>
                            </tr>
                            
                        </table>

                        
                    </div>

                    <p style = "letter-spacing: 2px; margin: 0">-----------------------------------------------------------------------------------</p>

                    
                    <table class="item-table">
                        <tr>
                            <td id = "items">ITEMS: </td>
                        </tr>
                        ${itemListHTML}
                    </table>


                    <p style = "letter-spacing: 2px; margin: 0">-----------------------------------------------------------------------------------</p>

                    <table id = "amount">
                        <tr>
                            <td id = "subtotal">Subtotal:</td>
                            <td class = "details1" style = "text-align:right"> ₱${subtotal.toFixed(2)}</td>
                        </tr>

                        <tr>
                        <td id = "Total">TOTAL AMOUNT: </td>
                        <td class = "details1" style = "text-align:right; font-weight: bold;">₱${total.toFixed(2)}</td>
                        </td>
                    </table>
                    <p>(Please take a screenshot of this receipt for future purposes.)</p>
                    <button id = "end-bttn">CLOSE</button>
                    </div>
                `
                receipt.innerHTML = receiptContainer;
            
                receipt.style.display = "block";
                
                if (newOrder) {
                    allSales.push(newOrder);
                    saveItems();
                    newOrder = null; // prevent duplicate push
                }
                console.log(newOrder);
                console.log(allSales);

                const close = document.getElementById("end-bttn");
                close.addEventListener("click", () => {
                   
                    localStorage.setItem("tempCustDetails", JSON.stringify([]));
                    localStorage.setItem("cartItems", JSON.stringify([]));
                    window.location.href = "../homepage.html";
                });

            
        });


        
    
    });

    window.addEventListener("click", (e) => {
        if(e.target == placed) placed.style.display = "none";
    });

    



});


