// Add this to your checkout.js file

// Update the form submission handler
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('checkout.html')) {
        const checkoutForm = document.getElementById('checkout-form');
        
        // Add a payment amount input
        const paymentInput = document.getElementById('payment');
        
        // Back button functionality
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                // Get the payment input value
                const paymentMethod = paymentInput.value.trim().toLowerCase();
                
                // Get the total amount from the checkout page
                const totalElement = document.getElementById('total');
                const totalAmount = parseFloat(totalElement.textContent.replace('$', ''));
                
                // Validate payment method
                if (!paymentMethod) {
                    showPaymentError('Please enter a payment method');
                    return;
                }
                
                // You can add more payment method validations here
                const validPaymentMethods = ['cash', 'card', 'bank transfer'];
                if (!validPaymentMethods.includes(paymentMethod)) {
                    showPaymentError('Please enter a valid payment method (cash, card, or bank transfer)');
                    return;
                }

                // If payment method is valid, proceed with order processing
                const checkoutData = JSON.parse(sessionStorage.getItem('checkoutCart'));
                
                const orderData = {
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
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
    paymentInput.parentNode.insertBefore(errorDiv, paymentInput.nextSibling);
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

    // Save order data if needed
    // localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Redirect to thank you page
    window.location.href = 'thank-you.html';
}