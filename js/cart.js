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
        // console.log("Added to cart:", newItem);
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



document.addEventListener("DOMContentLoaded", () => {
    getStorage(); // load cart items
    getCustDet();
    tempCustomerDet();

    const btn = document.getElementById('checkout-bttn');
    const chck = document.getElementById('checkout-details');
    const closeBtn = document.getElementById('close');
    const form = document.getElementById('checkoutForm');

    // Show checkout form
    btn.addEventListener("click", () => {
        if(cartItems.length === 0){
            alert("Cart is empty! Can't checkout :<");
            return;
        }
        chck.style.display = "block";
    });

    // Close form
    closeBtn.addEventListener("click", () => {
        chck.style.display = "none";
    });
    window.addEventListener("click", (e) => {
        if(e.target == chck) chck.style.display = "none";
    });

    // Form submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const num = document.getElementById("num").value;
        const address = document.getElementById("address").value;
        const message = document.getElementById("msg").value;

        if(!name || !num || !address){
            alert("Please fill in all fields.");
            return;
        }

        const customerData = {
            Name: name,
            ContactNumber: num,
            Address: address,
            Message: message || "None"
        };

        tempCustDetails.push(customerData);
        CustomerDetails.push(customerData);

        // Save to localStorage
        saveDetails();
        tempSaveDetails();

        alert("Form submitted! Proceeding to checkout...");
        window.location.href = "./checkout.html"; // navigate after saving
    });
});

