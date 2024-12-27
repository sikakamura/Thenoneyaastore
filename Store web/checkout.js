// Add this to your existing CartManager class
class CartManager {
    // ... your existing methods ...

    processCheckout() {
        if (this.cart.length === 0) {
            this.showNotification("Your cart is empty. Please add items before checking out.");
            return false;
        }
        
        // Store cart data in sessionStorage for checkout page
        sessionStorage.setItem('checkoutCart', JSON.stringify(this.cart));
        return true;
    }
}

// Update the checkout function to work with your button
function checkout() {
    if (!cartManager.processCheckout()) {
        return; // Stop if cart is empty
    }

    // Save current cart state
    sessionStorage.setItem('checkoutCart', JSON.stringify(cartManager.cart));
    
    // Redirect to checkout page
    window.location.href = "checkout.html";
}

// Add this to handle the checkout page initialization
document.addEventListener('DOMContentLoaded', () => {
    // Only run this code on the checkout page
    if (window.location.pathname.includes('checkout.html')) {
        const checkoutData = JSON.parse(sessionStorage.getItem('checkoutCart'));
        
        if (!checkoutData || checkoutData.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        // Populate order details
        const orderItemsList = document.getElementById('order-items');
        if (orderItemsList) {
            let subtotal = 0;

            checkoutData.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <span>${item.product.name} x ${item.quantity}</span>
                    <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
                `;
                orderItemsList.appendChild(listItem);
                subtotal += item.product.price * item.quantity;
            });

            // Update totals
            const shipping = 0; // Free shipping
            const total = subtotal + shipping;

            if (document.getElementById('subtotal')) {
                document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            }
            if (document.getElementById('shipping')) {
                document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
            }
            if (document.getElementById('total')) {
                document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            }
        }

        // Handle checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const orderData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip: document.getElementById('zip').value,
                    items: checkoutData
                };

                // Process the order
                cartManager.cart = []; // Clear the cart
                cartManager.saveCart(); // Save empty cart to localStorage
                sessionStorage.removeItem('checkoutCart'); // Clear checkout data
                
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            });
        }
    }
});