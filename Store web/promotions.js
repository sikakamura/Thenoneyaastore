
document.addEventListener('DOMContentLoaded', () => {
    const promotionsList = document.getElementById('promotions-list');

    const promotions = [
        {
            id: 1,
            name: 'Summer Sale - 20% Off',
            description: 'Enjoy 20% off on all summer apparel!',
            imageUrl: 'img/mix.jpg',
            originalPrice: 50,
            discountedPrice: 40
        },
        {
            id: 2,
            name: 'Buy One Get One Free',
            description: 'Buy any coffee mug and get another one free!',
            imageUrl: 'img/mix2.jpg',
            originalPrice: 15,
            discountedPrice: 15
        },
        {
            id: 3,
            name: 'Free Shipping on Orders Over $50',
            description: 'Get free shipping on all orders over $50.',
            imageUrl: 'img/yellow.jpg',
            originalPrice: 0,
            discountedPrice: 0
        }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1; 
        } else {
            product.quantity = 1;
            cart.push(product); // Add new product to cart
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartCount(); // Update cart count display
        showNotification(`${product.name} added to cart!`);
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
            cartCountElement.textContent = totalItems; 
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message; 
        notification.style.display = 'block'; 
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

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
                    <button class="btn btn-primary" onclick="addToCart({ id: ${promo.id}, name: '${promo.name}', price: ${promo.discountedPrice}, imageUrl: '${promo.imageUrl}' })">Add to Cart</button>
                </div>
            </div>
        `;
        promotionsList.appendChild(promoElement);
    });

    updateCartCount(); 
});