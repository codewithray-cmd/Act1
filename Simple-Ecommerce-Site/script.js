const home_nav = document.getElementById('home-nav')
const products_nav = document.getElementById('products-nav')
const cart_nav = document.getElementById('cart-nav')

const home_section = document.getElementById('home')
const products_section = document.getElementById('products')
const cart_section = document.getElementById('cart')

const shopBtn = document.querySelector('.shop-btn')
shopBtn.addEventListener('click', function(){
    products_section.style.display = "block"
    home_section.style.display = "none"
    cart_section.style.display = "none"
})

// This is for navigating pages used in the sidebar
home_nav.addEventListener('click', function(){
    home_section.style.display = "block"
    cart_section.style.display = "none"
    products_section.style.display = "none"
})

products_nav.addEventListener('click', function(){
    products_section.style.display = "block"
    home_section.style.display = "none"
    cart_section.style.display = "none"
})

cart_nav.addEventListener('click', function(){
    cart_section.style.display = "block"
    home_section.style.display = "none"
    products_section.style.display = "none"
})


// //Product Data
// const products = {
//     'product1': {
//         name: 'iPhone 16 Pro Max',
//         basePrice: 84990,
//         storageOptions: {
//             '256GB': 84990,
//             '512GB': 96990,
//             '1TB': 108990,
//         },
//     },
//     'product2': {
//         name: 'iPhone 16 Pro',
//         basePrice: 69990,
//         storageOptions: {
//             '128GB': 69990,
//             '256GB': 76990,
//             '512GB': 89990,
//             '1TB': 100990,
//         },
//     },
//     'product3': {
//         name: 'iPhone 16 Plus',
//         basePrice: 62990,
//         storageOptions: {
//             '128GB': 62990,
//             '256GB': 69990,
//             '512GB': 81990,
//         },
//     },
//     'product4': {
//         name: 'iPhone 16',
//         basePrice: 54990,
//         storageOptions: {
//             '128GB': 54990,
//             '256GB': 61990,
//             '512GB': 73990,
//         },
//     },
// };

// // Select all "Add to Cart" buttons
// const addToCartButtons = document.querySelectorAll('.product-card button');

// // Select popup elements
// const popup = document.querySelector('.pop-up');
// const popupProductName = document.querySelector('.popup-product-name');
// const storageSelect = document.getElementById('storage');
// const priceDisplay = document.querySelector('.popup-content .price');

// // Variable to store the current product being configured
// let currentProduct;

// // Add event listeners to buttons
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Get the product card and product ID
//         const productCard = button.closest('.product-card');
//         const productId = productCard.dataset.productId; // Assume each product card has a data-product-id attribute

//         // Get the product data
//         currentProduct = products[productId];

//         // Update the popup content
//         popupProductName.textContent = currentProduct.name;
//         updateStorageOptions(currentProduct.storageOptions);
//         updatePrice(currentProduct.basePrice);

//         // Show the popup
//         popup.style.display = 'block';
//     });
// });

// // Function to update storage options in the select dropdown
// const updateStorageOptions = (storageOptions) => {
//     storageSelect.innerHTML = ''; // Clear existing options

//     for (const [storage, additionalPrice] of Object.entries(storageOptions)) {
//         const option = document.createElement('option');
//         option.value = storage;
//         option.textContent = storage;
//         storageSelect.appendChild(option);
//     }
// }

// // Function to update the price display
// const updatePrice = (basePrice) => {
//     const selectedStorage = storageSelect.value;
//     const additionalPrice = currentProduct.storageOptions[selectedStorage];
//     const totalPrice = basePrice + additionalPrice;

//     priceDisplay.textContent = `₱${totalPrice.toLocaleString()}`;
// }

// // Event listener for storage selection change
// storageSelect.addEventListener('change', function() {
//     updatePrice(currentProduct.basePrice);
// });

// // Close the popup when clicking outside of it
// window.addEventListener('click', function(event) {
//     if (event.target === popup) {
//         popup.style.display = 'none';
//     }
// });

// This object is for storing data when user add a product to cart
let cart = { products: [] };

// 
const addProductToCart = (productName, src, display, price) => {
    cart.products.push({ productName, src, display, price });
    updateCartDisplay(); // Call function to update cart UI
};

const popup = document.querySelector('.pop-up')
const close_popup_btn = document.querySelector('.close-popup')
const popup_container = document.querySelector('.popup-container')
const section_title = document.querySelector('.section-title')

const close_popup = () => {
    popup.classList.remove('open-popup')
    popup_container.style.display = 'none'
}

document.addEventListener('click', function(event) {
    if (event.target.matches('.product-card button')) {
        console.log('Button Clicked:', event.target);

        const productCard = event.target.closest('.product-card');
        const productImage = productCard.querySelector('img').getAttribute('src');
        const productName = productCard.querySelector('h3').textContent;
        const displayInfo = productCard.querySelector('p').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₱', '').replace(',', ''));

        console.log(`Product Image Source: ${productImage}`);
        console.log(`Product Name: ${productName}`);
        console.log(`Product Price: ${productPrice}`);

        let isInside = false
        for (let i = 0; i < cart.products.length; i++){
            if(cart.products[i].productName === productName){
                console.log('product is in the object')
                isInside = true
            }
        }

        if(!isInside){
            popup.classList.add('open-popup')
            popup_container.style.display = 'block'
            section_title.style.zIndex = 'auto'
            addProductToCart(productName, productImage, displayInfo, productPrice);
        }else{
            alert('Product is already has been added to cart')
        }

    }
});

const removeProductFromCart = (productName) => {
    // Filter out the product with the given productName
    cart.products = cart.products.filter(product => product.productName !== productName);
    
    console.log(`Removed: ${productName}`);
    console.log(JSON.stringify(cart, null, 2)); // Print updated cart
    updateCartDisplay(); // Refresh the UI
};


document.addEventListener('click', function(event){
    if (event.target.matches('.cart-card .remove')){
        console.log(`Button Clicked: ${event.target}`)

        const cartCard = event.target.closest('.cart-card')
        const cardName = cartCard.querySelector('h3').textContent

        removeProductFromCart(cardName)
    }
})

// Function to update cart display
const updateCartDisplay = () => {
    let cart_content = document.querySelector('.cart-content');
    cart_content.innerHTML = ""; // Clear previous content
    let count_total = 0;

    cart.products.forEach((product, index) => {
        const formattedPrice = product.price.toLocaleString();

        const cart_html = `
            <div class="cart-card">
                <img src="${product.src}" alt="${product.productName}">
                <h3>${product.productName}</h3>
                <p>${product.display}</p>
                <p class="price">&#8369;${formattedPrice}</p>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        `;
        count_total += product.price;
        cart_content.innerHTML += cart_html;
    });

    console.log("Updated Cart:", cart.products);
    let total = document.querySelector('.cart-total')
    total.textContent = `Total: ₱${count_total.toLocaleString()}`
}


// for (let key in add_to_cart){
//     if (add_to_cart.hasOwnProperty(key)){
//         const product = add_to_cart[key]
//         const formattedPrice = product.price.toLocaleString()

//         const cart_html = `
//             <div class="product-card">
//                 <img src="${product.src}" alt="${product.product_name}">
//                 <h3>${product.product_name}</h3>
//                 <p>${product.variant}</p>
//                 <p class="price">&#8369;${formattedPrice}</p>
//                 <button class="remove">Remove</button>
//             </div>
//         `
//         count_total += product.price
//         cart_content.innerHTML += cart_html
//     }
// }

// let total = document.querySelector('.cart-total')
// total.textContent = `Total: ₱${count_total.toLocaleString()}`

