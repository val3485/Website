const products =

[{
    id: "1",
    name: "SAMPLE A",
    price: "20.00",
    image: "../pics/kape.svg"
},

{
    id: "2",
    name: "SAMPLE B",
    price: "35.00",
    image: "../pics/coffee.svg"
}, 

{
    id: "3",
    name: "SAMPLE C",
    price: "50.00",
    image: "../pics/non_caffein.svg"
}
]

let cartItems = [];

function getStorage(){
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveStorage(){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

const buttons = document.querySelectorAll('.js-add-to-cart');

buttons.forEach(button => {
    button.addEventListener('click', () => {
       const productID = button.getAttribute('data-productID');
       addToCart(productID);
       });
});

function addToCart(productID) {
    getStorage();
     
    let matchingItem;

    // Check if the item is already in the cart
    cartItems.forEach(item => {
        if (item.id === productID) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        // If the item is already in the cart, increase the quantity
        matchingItem.quantity++;
    } else {
        // If the item is not in the cart, add it
        const newItem = {
            id: productID,
            quantity: 1
        };
        cartItems.push(newItem);
    }
    
    saveStorage();
    console.log(matchingItem);
    // console.log(cartItems);
}
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


document.addEventListener('DOMContentLoaded', () => {
    getStorage();
    let cartContainer = ' ';
    let total = 0;

    cartItems.forEach((item) => {
        const matchingProduct = products.find(product => product.id === item.id);
        const itemTotal = matchingProduct.price * item.quantity;
        total += itemTotal;

        cartContainer +=
        `<div class = "cart-item">
            <img class = "item-image" src = "${matchingProduct.image}">
            <p class = "item-name">${matchingProduct.name}</p>
            <p class = "item-price">${matchingProduct.price}</p>
            <button class="add-button" onclick="addFromCart('${item.id}'); location.reload();">+</button>
            <p class = "item-quantity">${item.quantity}</p>
            <button class="remove-button" onclick="removeFromCart('${item.id}'); location.reload();">-</button>
            <p class = "item-total">Php. ${(matchingProduct.price * item.quantity).toFixed(2)}</p>
        </div>   

        `;

     console.log(`Item image: ${matchingProduct.image}`);

    });
   

   



    if (cartItems.length > 0) {
        document.querySelector('#container').innerHTML = cartContainer;
    } else {
        document.querySelector('#container').innerHTML = '<p>Your cart is empty.</p>';
    }

    document.querySelector('.total').innerText = `Total: $${total.toFixed(2)}`;


});