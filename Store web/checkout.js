// Instead of declaring a new CartManager class, add this method to your existing CartManager class
// Find your existing CartManager class and add this method to it:
CartManager.prototype.processCheckout = function() {
    if (this.cart.length === 0) {
        this.showNotification("Your cart is empty. Please add items before checking out.");
        return false;
    }
    
    // Store cart data in sessionStorage for checkout page
    sessionStorage.setItem('checkoutCart', JSON.stringify(this.cart));
    return true;
};

// Standalone checkout function
function checkout() {
    if (!cartManager.processCheckout()) {
        return; // Stop if cart is empty
    }
    
    // Redirect to checkout page
    window.location.href = "checkout.html";
}
// Add this to your checkout.js file
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

        // Back button functionality
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }

        // Handle checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                const nameInput = document.getElementById('name');
                const addressInput = document.getElementById('address');
                const paymentInput = document.getElementById('payment');
                const totalElement = document.getElementById('total');

                // Check if all required elements exist
                if (!nameInput || !addressInput || !paymentInput || !totalElement) {
                    console.error('Required form elements are missing');
                    return;
                }

                // Get the payment input value
                const paymentMethod = paymentInput.value.trim().toLowerCase();
                const totalAmount = parseFloat(totalElement.textContent.replace('$', ''));
                
                // Validate payment method
                if (!paymentMethod) {
                    showPaymentError('Please enter a payment method');
                    return;
                }
                
                // Validate payment method type
                const validPaymentMethods = ['cash', 'card', 'bank transfer'];
                if (!validPaymentMethods.includes(paymentMethod)) {
                    showPaymentError('Please enter a valid payment method (cash, card, or bank transfer)');
                    return;
                }

                const orderData = {
                    name: nameInput.value,
                    address: addressInput.value,
                    paymentMethod: paymentMethod,
                    items: checkoutData,
                    total: totalAmount
                };

                // Process the order
                processOrder(orderData);
            });
        }
    }
});

// Function to show payment error messages
function showPaymentError(message) {
    // Remove any existing error message
    const existingError = document.querySelector('.payment-error');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'payment-error';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    errorDiv.textContent = message;
    
    const paymentInput = document.getElementById('payment');
    if (paymentInput && paymentInput.parentNode) {
        paymentInput.parentNode.insertBefore(errorDiv, paymentInput.nextSibling);
    }
}

// Function to process the order
function processOrder(orderData) {
    // Clear cart and checkout data
    const cartManager = window.cartManager;
    if (cartManager) {
        cartManager.cart = [];
        cartManager.saveCart();
    }
    sessionStorage.removeItem('checkoutCart');

    // Redirect to thank you page
    window.location.href = 'thank-you.html';
}