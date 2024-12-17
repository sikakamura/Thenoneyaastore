// checkout.js

// Function to handle the checkout process
function checkout() {
    if (cartManager.cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
    } else {
        window.location.href = "checkout.html"; // Redirect to the checkout page
    }
}

// Function to handle form submission on the checkout page
function handleCheckoutFormSubmission(event) {
    event.preventDefault();
    
    // Gather form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    // Process payment here (e.g., call a payment API)

    // Show confirmation message
    alert("Thank you for your order, " + name + "!");
    
    // Clear the cart and redirect if necessary
    cartManager.clearCart();
    window.location.href = "thank-you.html"; // Redirect to a thank you page
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Gather data and process the order
    alert("Order placed!");
    cartManager.clearCart(); // Clear the cart after order
});
// Attach event listener to the checkout form
// checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', handleCheckoutFormSubmission);
    }
});

function handleCheckoutFormSubmission(event) {
    event.preventDefault();
    
    // Gather form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    // Process payment here (e.g., call a payment API)

    // Show confirmation message
    alert("Thank you for your order, " + name + "!");
    
    // Clear the cart and redirect if necessary
    cartManager.clearCart(); // Ensure you have a method to clear the cart in CartManager
    window.location.href = "thank-you.html"; // Redirect to a thank-you page
}