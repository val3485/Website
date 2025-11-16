//array of valid numbers
const prefixes = [
    "900","901","902","903","904","905","906","907","908","909",
    "817","813","910","911","912","913","914","915","916","917","918","919",
    "920","921","928","926","929","930","938","939","946","947","948","949",
    "950","951","952","953","961","962","963","965","966","967","976","968",
    "969","970","975","977","978","979","981","989","991","992","993","994",
    "995","996","997","998","999"
];

let cartItems = [];
let allSales = [];

//cart items
function getStorage(){
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveStorage(){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


//this array holds all sales of the shop
function placedItems(){
    allSales = JSON.parse(localStorage.getItem('allSales')) || [];
}

function saveItems() {
    localStorage.setItem('allSales', JSON.stringify(allSales));
}

//cut

//add to cart via add to cart button
function addToCart() {
    const productID =   ProductIdUrl();
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
    AddToCart();
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

//displaying orders in the cart
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


function isValidPHNumber(num) {
    num = num.trim();
    if (num.startsWith("0")) {
        const prefix = num.substring(1, 4);
        return prefixes.includes(prefix) && num.length === 11;
    } else if (num.startsWith("+63")) {
        const prefix = num.substring(3, 6);
        return prefixes.includes(prefix) && num.length === 13;
    }
    return false;
}

//checkout button
document.addEventListener("DOMContentLoaded", () => {
    getStorage(); // load cart items
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

        const name = document.getElementById("name").value.trim();
        const num = document.getElementById("num").value.trim();
        const address = document.getElementById("address").value.trim();
        const message = document.getElementById("msg").value.trim();

        if(!name || !num || !address){
            alert("Please fill in all fields.");
            return;
        }


        if(!isValidPHNumber(num)) {
            alert("Please enter a valid Philippine mobile number (09XXXXXXXXX or +639XXXXXXXXX).");
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
        tempSaveDetails();

        alert("Form submitted! Proceeding to checkout...");
        window.location.href = "./checkout.html"; // navigate after saving
    });
});

