
function ProductIdUrl() { //this will perform the extraction of id
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function findProductById(id) { // this searches through the array to find prod that matches the id
    // 'products'- global variable defined in my other .js
    return products.find(product => product.id === id);
}

function ProductDetails() { //retrieve and dispaly specific prod data
    const productId = ProductIdUrl();
    const product = findProductById(productId);

    const mainContainer = document.querySelector('main');
    const imageContainer = document.getElementById('image-area'); 
    const nameElement = document.getElementById('p-name'); 
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    
    if (product) { // checks if all is found 
        document.title = `${product.name} - Purr n Pour`;
        
        if (nameElement) {
             nameElement.textContent = product.name; 
        } 

        if (priceElement) {
            priceElement.textContent = `₱${product.price.toFixed(2)}`; //.toFixed(2) is to force the decimals
        }

        if (descriptionElement) {
            descriptionElement.textContent = product.description; 
        }

        if (imageContainer) {
             imageContainer.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="image-area">
            `;
        }
        
    }
}

function AddToCart() {
    const popup = document.getElementById('cart-popup');
    if (popup) {
        popup.style.display = 'flex'; // shows the popup
    }
}

function closeCart() {
    const popup = document.getElementById('cart-popup');
    if (popup) {
        popup.style.display = 'none'; // hides the popup
    }
}

document.addEventListener('DOMContentLoaded', () => { //DOM is like a blueprint or the structure of the HTML page. it allows js to provide details.
    ProductDetails(); 
});