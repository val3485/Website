/**
 *Extracts the 'id' query parameter from the current URL.
 * @returns {string | null} The product ID or null if not found.
 */
function getProductIdFromUrl() { //this will perform the extraction
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Finds a product in the global 'products' array by ID.
 * @param {string} id - The ID to search for.
 * @returns {object | undefined} The matching product object.
 */
function findProductById(id) {
    // 'products'- global variable defined in my other .js
    return products.find(product => product.id === id);
}

function renderProductDetails() {
    const productId = getProductIdFromUrl();
    const product = findProductById(productId);

    const mainContainer = document.querySelector('main');
    const imageContainer = document.getElementById('image-area'); 
    const nameElement = document.getElementById('p-name'); 
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    
    if (product) {
        document.title = `${product.name} - Purr n Pour`;
        
        if (nameElement) {
             nameElement.textContent = product.name; 
        } 

        if (priceElement) {
            priceElement.textContent = `(₱${product.price.toFixed(2)})`; 
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
function showCartPopup() {
    const popup = document.getElementById('cart-popup');
    if (popup) {
        popup.style.display = 'flex'; // shows the popup
    }
}

function closeCartPopup() {
    const popup = document.getElementById('cart-popup');
    if (popup) {
        popup.style.display = 'none'; // hides the popup
    }
}

// function AddToCart() {
//     // it's the logic bruhh, i can't do that typa shi. logic so that the product chosen will add to the cart.
//     showCartPopup();
// }

document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
});