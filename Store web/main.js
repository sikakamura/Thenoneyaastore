// Product Class
class Product {
    constructor(id, name, price, description, category, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.imageUrl = `/img/${imageUrl}`; // Update image path to img folder
    }
}

// Cart Manager Class
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartDisplay();
        this.updateCartCount();
    }

    addToCart(product, quantity = 1) {
        const validProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl
        };

        const existingProductIndex = this.cart.findIndex(item => item.product.id === validProduct.id);
        if (existingProductIndex > -1) {
            this.cart[existingProductIndex].quantity += quantity;
        } else {
            this.cart.push({ product: validProduct, quantity });
        }
        
        this.saveCart();
        this.showNotification(`${validProduct.name} added to cart!`);
        this.updateCartDisplay();
        this.updateCartCount();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, newQuantity) {
        const itemIndex = this.cart.findIndex(item => item.product.id === productId);
        if (itemIndex > -1) {
            this.cart[itemIndex].quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
        }
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (!cartItemsContainer || !cartTotalElement) return;

        cartItemsContainer.innerHTML = '';
        
        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
            cartTotalElement.textContent = 'Total: $0.00';
            return;
        }

        this.cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.product.imageUrl}" alt="${item.product.name}">
                <div class="cart-item-details">
                    <h5>${item.product.name}</h5>
                    <p>Price: $${item.product.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <label>Quantity: 
                            <input type="number" 
                                   value="${item.quantity}" 
                                   min="1" 
                                   class="quantity-input" 
                                   data-id="${item.product.id}">
                        </label>
                    </div>
                    <button class="btn btn-danger btn-sm mt-2" 
                            onclick="cartManager.removeFromCart(${item.product.id})">
                        Remove
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            // Add event listener for quantity changes
            const quantityInput = cartItemDiv.querySelector('.quantity-input');
            quantityInput.addEventListener('change', (event) => {
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    this.updateQuantity(item.product.id, newQuantity);
                } else {
                    event.target.value = 1;
                    this.updateQuantity(item.product.id, 1);
                }
            });
        });

        const total = this.calculateTotal();
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Initialize CartManager
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
    loadProducts();
    loadPromotions();
});


// Load Products
function loadProducts() {
    const products = [
        new Product(1, ' Grey Sweater Shirt', 29.99, 'A cozy sweater.', 'Clothing', 'sweater.jpg'),
        new Product(2, 'Blue Sweater Shirt', 19.99, 'A cozy blue sweater.', 'Clothing', 'blue-sweater.jpg'),
        new Product(3, 'White Shirt', 19.99, 'A stylish T-shirt.', 'Clothing', 'white.jpg'), 
        new Product(7, 'Sport Shirt', 19.99, 'A stylish T-shirt.', 'Clothing', 'sport.jpg'), 
        new Product(8, 'Leo Shirt', 19.99, 'A stylish T-shirt.', 'Clothing', 'leo.jpg'), 
        new Product(9, 'Japen Shirt', 19.99, 'A stylish T-shirt.', 'Clothing', 'japen.jpg'), 
        new Product(10, 'Grey Shirt', 19.99, 'A stylish T-shirt.', 'Clothing', 'grey.jpg'), 
        new Product(11, 'Swag Pant', 24.99, 'Comfortable pants.', 'Clothing', 'swagp.jpg'), 
        new Product(12, 'Short Pants', 34.99, 'Trendy sport pants.', 'Clothing', 'short p.jpg'), 
        new Product(13, 'Red Pants', 34.99, 'Trendy sport pants.', 'Clothing', 'redp.jpg'), 
        new Product(14, 'Green Pants', 34.99, 'Trendy sport pants.', 'Clothing', 'greenp.jpg'), 
        new Product(15, 'Blue Pants', 34.99, 'Trendy sport pants.', 'Clothing', 'bluep.jpg'), 
        new Product(16, 'Puma Shoes', 34.99, 'Trendy sport pants.', 'Clothing', 'puma.jpg'), 
        new Product(17, 'Vanz Shoes', 34.99, 'Trendy sport pants.', 'Clothing', 'Vanz.jpg'), 
        new Product(18, 'Samba Shoes', 34.99, 'Trendy sport pants.', 'Clothing', 'samba.jpg'), 
        new Product(19, 'Boot Shoes', 34.99, 'Trendy sport pants.', 'Clothing', 'boot.jpg'), 
        new Product(20, 'Japen Shoes', 34.99, 'Trendy sport pants.', 'Clothing', 'japeng.jpg'), 
        new Product(21, 'Casio Classic Watch ', 34.99, 'Trendy sport pants.', 'Clothing', 'w1.jpg'), 
        new Product(22, 'Tissort Watch', 34.99, 'Trendy sport pants.', 'Clothing', 'w2.jpg'),
        new Product(23, 'Owl Watch ', 34.99, 'Trendy sport pants.', 'Clothing', 'w3.jpg'), 
        new Product(24, 'Nike Watch ', 34.99, 'Trendy sport pants.', 'Clothing', 'w4.jpg'), 
        new Product(25, 'Owl Stand Watch ', 34.99, 'Trendy sport pants.', 'Clothing', 'w5.jpg'), 
        // Add more products as needed
    ];

    const productsContainer = document.getElementById('products-container');
const pantsContainer = document.getElementById('pants-container');
const shoesContainer = document.getElementById('shoes-container'); 
const watchContainer = document.getElementById('watch-container'); 

if (productsContainer) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4';
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: $${product.price.toFixed(2)}</p>
                    <button onclick="cartManager.addToCart({ id: ${product.id}, name: '${product.name}', price: ${product.price}, imageUrl: '${product.imageUrl}' })" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;

        // Separate the products into their respective containers
        if (product.name.includes('Shirt')) {
            productsContainer.appendChild(productCard);
        } else if (product.name.includes('Pant')) {
            pantsContainer.appendChild(productCard);
        } else if (product.name.includes('Shoes')) { // Changed to 'Shoes'
            shoesContainer.appendChild(productCard);
        }else if (product.name.includes('Watch')) { 
            watchContainer.appendChild(productCard);
        }
    });
} else {
    console.error('Products container not found');
}
}


// Load Promotions
function loadPromotions() {
    const promotionsList = document.getElementById('promotions-list');
    const promotions = [
        {
            id: 4,
            name: 'Summer Sale - 20% Off',
            description: 'Enjoy 20% off on all summer apparel!',
            imageUrl: 'img/mix.jpg', // Update with actual image path
            originalPrice: 50,
            discountedPrice: 40
        },
        {
            id: 5,
            name: 'Buy One Get One Free',
            description: 'Buy any coffee mug and get another one free!',
            imageUrl: 'img/mix2.jpg', // Update with actual image path
            originalPrice: 20,
            discountedPrice: 15 // Same price because it's BOGO
        },
        {
            id: 6,
            name: 'Free Shipping on Orders Over $50',
            description: 'Get free shipping on all orders over $50.',
            imageUrl: 'img/yellow.jpg', // Update with actual image path
            originalPrice: 19.99,
            discountedPrice: 0
        }
    ];

    if (promotionsList) {
        promotions.forEach(promo => {
            const promoElement = document.createElement('div');
            promoElement.className = 'col-md-4 mb-4';
            promoElement.innerHTML = `
                <div class="card">
                    <img src="${promo.imageUrl}" class="card-img-top" alt="${promo.name}">
                    <div class="card-body">
                        <h5 class="card-title">${promo.name}</h5>
                        <p class="card-text">${promo.description}</p>
                        <p class="text-danger"><del>$${promo.originalPrice.toFixed(2)}</del> <strong>$${promo.discountedPrice.toFixed(2)}</strong></p>
                        <button class="btn btn-primary" onclick="cartManager.addToCart({ id: ${promo.id}, name: '${promo.name}', price: ${promo.discountedPrice}, imageUrl: '${promo.imageUrl}' })">Add to Cart</button>
                    </div>
                </div>
            `;
            promotionsList.appendChild(promoElement);
        });
    } else {
        console.error('Promotions list not found');
    }
}