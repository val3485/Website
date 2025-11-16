const products =
[{ //properties
    category: "HOT COFFEE",
    id: "1",
    name: "Latte",
    price: 170.00,
    image: "./pics/latte.svg",
    description: "Smooth and mellow. A gentle blend of espresso and steamed milk, our Latte captures the quiet and elegance of Purr & Pour Cafe."
},
{
    category: "HOT COFFEE",
    id: "2",
    name: "Flat White",
    price: 175.00,
    image: "./pics/flat white.svg",
    description: "Silky and strong, with a fine layer of microfoam that embraces the espresso’s boldness. This drink embraces Purr & Pour’s beauty and minimalist grace."
}, 
{
    category: "HOT COFFEE",
    id: "3",
    name: "Espresso",
    price: 135.00,
    image: "./pics/espresso.svg",
    description: "Strong, dark, and sincere. Purr & Pour’s Espresso represents pure intensity with no distractions. A single moment of focus in a cup."
},
{ 
    category: "COLD COFFEE",
    id: "4",
    name: "Affogato",
    price: 220.00,
    image: "./pics/affogato.svg",
    description: "A delicate blend of warmth and sweetness, espresso poured over creamy vanilla ice cream. The meeting of contrast and comfort, just like Purr & Pour’s balance between mystery and charm."
},
{
    category: "COLD COFFEE",
    id: "5",
    name: "Americano ",
    price: 160.0,
    image: "./pics/americano.svg",
    description: "Light, crisp, and refreshingly simple. This drink offers clarity and calm. A quiet reminder to pause and appreciate the still moments of the day."
},
{
    category: "COLD COFFEE",
    id: "6",
    name: "Cold Brew with Milk",
    price: 165.00,
    image: "./pics/brew.svg",
    description: "Steeped slowly and blended softly with milk. Purr & Pour’s Cold Brew with Milk embodies patience with grace. Its smooth, deep flavor invites you to unwind and savor the unhurried."
},
{
    category: "COLD COFFEE",
    id: "7",
    name: "Caramel Macchiato",
    price: 175.00,
    image: "./pics/caramel macchiato.svg",
    description: "A comforting mix of espresso, milk, and caramel. Rich yet soft, bold yet familiar. Like a cozy afternoon spent inside Purr & Pour Cafe."
},
{
    category: "NON-CAFFEINATED",
    id: "8",
    name: "Lemonade",
    price: 125.00,
    image: "./pics/lemonade.svg",
    description: "Fresh and lively, this bright favorite brings a gentle lift to your day. A splash of sunlight to brighten Purr & Pour’s tranquil atmosphere."
},
{
    category: "NON-CAFFEINATED",
    id: "9",
    name: "Hot Chocolate",
    price: 170.00,
    image: "./pics/choco.svg",
    description: "Thick, silky, and soothing that’s perfect for quiet moments. It’s warmth in its sweetest form, comforting like a purring cat on your lap."
},
{
    category: "NON-CAFFEINATED",
    id: "10",
    name: "Vanilla Milkshake",
    price: 180.00,
    image: "./pics/vanilla.svg",
    description: "Creamy, nostalgic, and playful. A sip that brings out Purr & Pour’s tender side, where comfort and calmness come together."
},
]

const productGridContainer = document.querySelector('.product-grid'); //search the entire categhtml with the class and assigns it of the variable

function UrlParameter(paramName) { //this function is to know what categ was clicked in the sidebar
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName); //retrieves the selected categ
}
 
function ProductsByCateg(selectedCateg) { //filters the array by the selected categ
    if (selectedCateg === 'ALL') { // if ALL, there's no filtering happen. it will return all the products.
        return products; 
    }
    
    return products.filter(product => product.category === selectedCateg);
}

function displayProducts(prodToDisplay) {
    productGridContainer.innerHTML = ''; // clears previous products to prevent mixing og products.

    prodToDisplay.forEach(product => { //.forEach loops through every prod in array.
        const productLink = document.createElement('a'); //creates the link
        productLink.href = `product.html?id=${product.id}`; //its destination using id
        productLink.classList.add('link');
        
        const productDiv = document.createElement('div'); //created for inner container of image and name
        productDiv.classList.add('prod'); //the class so css can style ehe.
        
        //inserts prod image and name
        productDiv.innerHTML = `
            <img src="${product.image}" class="prod-image" alt="${product.name}"> 
            <p class="prod-name">${product.name}</p>
        `;
        
        productLink.appendChild(productDiv); //displays the prodiv
        productGridContainer.appendChild(productLink); //the link
    });
}
// displays, updates the screen with the selected categ.
function handleCateg(selectedCateg) {
    const normalizedCategory = selectedCateg.toUpperCase(); //convert ALL CAPS
    //calls these 2 functions
    const filteredProducts = ProductsByCateg(normalizedCategory);
    displayProducts(filteredProducts);

    // setting the labels for each categ
    const labelsContainer = document.getElementById('category');
    if (labelsContainer) {
        labelsContainer.innerHTML = '';
        // label
        const activeLabel = document.createElement('p');
        // this is for styling 
        activeLabel.classList.add('category', 'selected-category');
        activeLabel.textContent = normalizedCategory;
        
        labelsContainer.appendChild(activeLabel);
    }
}

function ProductPage() {
    const urlCategory = UrlParameter('category');
    const initialCategory = urlCategory ? urlCategory.toUpperCase() : 'ALL'; //default view
    
    handleCateg(initialCategory);
}

ProductPage();