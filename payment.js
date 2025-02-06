
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('checkout.html')) {
        const checkoutForm = document.getElementById('checkout-form');
        

        const paymentInput = document.getElementById('payment');
        

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
          
                const paymentMethod = paymentInput.value.trim().toLowerCase();
                
            
                const totalElement = document.getElementById('total');
                const totalAmount = parseFloat(totalElement.textContent.replace('$', ''));
                
                if (!paymentMethod) {
                    showPaymentError('Please enter a payment method');
                    return;
                }
            
                const validPaymentMethods = ['cash', 'card', 'bank transfer'];
                if (!validPaymentMethods.includes(paymentMethod)) {
                    showPaymentError('Please enter a valid payment method (cash, card, or bank transfer)');
                    return;
                }

      
                const checkoutData = JSON.parse(sessionStorage.getItem('checkoutCart'));
                
                const orderData = {
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    paymentMethod: paymentMethod,
                    items: checkoutData,
                    total: totalAmount
                };

                processOrder(orderData);
            });
        }
    }
});


function showPaymentError(message) {

    const existingError = document.querySelector('.payment-error');
    if (existingError) {
        existingError.remove();
    }


    const errorDiv = document.createElement('div');
    errorDiv.className = 'payment-error';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    errorDiv.textContent = message;
    
    const paymentInput = document.getElementById('payment');
    paymentInput.parentNode.insertBefore(errorDiv, paymentInput.nextSibling);
}


function processOrder(orderData) {

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