// const products =
// [{
//     id: "1",
//     name: "SAMPLE A",
//     price: "20.00",
//     image: "../pics/kape.svg",
//     quantity: "10"
// },

// {
//     id: "2",
//     name: "SAMPLE B",
//     price: "35.00",
//     image: "../pics/coffee.svg"
// }, 

// {
//     id: "3",
//     name: "SAMPLE C",
//     price: "50.00",
//     image: "../pics/non_caffein.svg"
// }
// ]
console.log(products);

let cartItems = [];
let allSales = [];

//cart items
function getStorage(){
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveStorage(){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


//checkout items
function placedItems(){
    allSales = JSON.parse(localStorage.getItem('allSales')) || [];
}

function saveItems() {
    localStorage.setItem('allSales', JSON.stringify(allSales));
}

//cut

// const buttons = document.getElementById('add-to-cart-btn');

//     buttons.addEventListener('click', () => {
//     const ProductID = getProductIdFromUrl();
//     const productID = findProductById(ProductID);
//     console.log(productID);
//        addToCart(productID);
//        });



function addToCart() {
    const productID = getProductIdFromUrl();
    const product = findProductById(productID);

    if (!product) {
        alert("Product not found for ID:", productID);
        return;
    }

    getStorage();

    // Check if the item is already in the cart
    let matchingItem = cartItems.find(item => item.id === product.id);

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        };
        cartItems.push(newItem);
        console.log("Added to cart:", newItem);
    }

    saveStorage();
    showCartPopup();
}

window.addToCart = addToCart;

//remove item from cart
function removeFromCart(productID) {
    getStorage();

    cartItems.forEach(item => {
        if (item.id === productID) {
            if (item.quantity > 0) {
                item.quantity--;
            }

            else{
                item.quantity = 0;
            }
        }
    });  
    
    saveStorage();
}

// const chckoutBtn = document.getElementById('checkout-button');

// function CheckoutBttn () {
//     if(cartItems.length > 0) {
//         chckoutBtn.style.display = "inline-block";
//     }

//     else



function addFromCart(productID) {
    getStorage();  
    cartItems.forEach(item => {
        if (item.id === productID) {
            item.quantity++;
        }   
    });

    saveStorage();

}
function removeItem(productID) {
  cartItems = cartItems.filter(item => item.id !== productID);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


//document.addEventListener('DOMContentLoaded', () => {
    getStorage();
    let cartContainer = ' ';
    let total = 0;

    cartItems.forEach((item) => {
        const matchingProduct = products.find(product => product.id === item.id);

        if (!matchingProduct) {
        alert("Product not found for cart item:", item);
        return; // skip this item
        }

        const itemTotal = matchingProduct.price * item.quantity;
        total += itemTotal;

        cartContainer +=
        `<div class = "cart-item">
            <div class = "merge">
                <img class = "item-image" src = "${matchingProduct.image}">
                <p class = "item-name">${matchingProduct.name}</p>
            </div>

            <p class = "item-price">${matchingProduct.price}</p>
            <div class = "quantity-controls">
                <button class="add-button" onclick="addFromCart('${item.id}'); location.reload();">+</button>
                <p class = "item-quantity">${item.quantity}</p>
                <button class="remove-button" onclick="removeFromCart('${item.id}'); location.reload();">-</button>
            </div>
            <p class = "item-total">Php.  ${(matchingProduct.price * item.quantity).toFixed(2)}</p>
        </div>   
        `;
        
        if (item.quantity <=0){
            removeItem(item.id);
        }
       

    });


        


    if (cartItems.length > 0) {
        document.querySelector('#container').innerHTML = cartContainer;
    } else {
        document.querySelector('#container').innerHTML = '<p class = "empty">Your cart is empty. :<<</p>';
    }

    document.querySelector('.total').innerText = `YOUR TOTAL AMOUNT IS: Php. ${total.toFixed(2)}`;


//});




function checkout(){
    getStorage();

    if (cartItems.length === 0) {
        alert("Cart is empty! Can't checkout :<")
        return;
    }

    else{
        //checkout
        const chck = document.getElementById('checkout-details');
        const btn = document.getElementById('checkout-bttn');
        const closeBtn = document.getElementById('close');
        const form = document.getElementById('checkoutForm');

        //display form
        btn.addEventListener("click", () => {
            chck.style.display = "block";
        });


        //close button bruh
        closeBtn.addEventListener("click", () =>{
            chck.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if(e.target == chck) {
                chck.style.display = "none";
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const num = document.getElementById("num").value;
            const address = document.getElementById("address").value;

            if(name && num && address){
                alert("Form submitted! Proceeding to checkout...");
                window.location.href = "./checkout.html"; // go to checkout page
            } else {
                alert("Please fill in all fields.");
            }
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const btton = document.getElementById('checkout-bttn');
    btton.addEventListener("click", checkout);   
});



// function placeOrder(){
//     getStorage();

//     placedItems();

//     const newOrder = {
//         orderID: Date.now(),
//         items: cartItems,
//         date: new Date().toISOString()
//     };

//     allSales.push(newOrder);

//     saveItems();
//     console.log(newOrder);
//     localStorage.setItem('cartItems', JSON.stringify([]));

//     alert(`Order Placed Successfully! Order ID: ${newOrder.orderID}`);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const placed = document.getElementById('proceed-bttn');
//     placed.addEventListener("click", placeOrder());
// });

// console.log(placedItems());
// console.log(placeOrder());