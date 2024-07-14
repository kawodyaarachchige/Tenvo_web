document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.parentElement; // Get the parent cart item
            cartItem.remove(); // Remove the cart item from DOM
            updateCartTotal(); // Update the total price after deletion (if applicable)
        });
    });

    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing items

        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
               <div class="cart-item-image"></div><img src="${getImageFilename(item.name)}" alt="${item.name}"></div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <div>
                <button class="delete-btn">Delete</button>
</div>
            `;
            // Add delete functionality to each delete button
            const deleteButton = cartItemElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function() {
                // Remove item from cart
                cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                localStorage.setItem('cart', JSON.stringify(cartItems));

                // Update cart display
                displayCartItems();

                // Show confirmation message
                Swal.fire({
                    icon: 'success',
                    title: 'Removed',
                    text: 'Item removed from cart successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });

            cartItemsContainer.appendChild(cartItemElement);
        });

        // Calculate and display total price
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Event listener for checkout button
    checkoutBtn.addEventListener('click', function() {
        // First Swal for Payment Details
        Swal.fire({
            title: 'Payment Details',
            imageUrl: '../../assets/images/payment.png',
            html: `
                <style>
                    #payment-form {
                        margin-top: 10px;
                    }
                    #payment-form label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    #payment-form input[type="text"] {
                        width: 100%;
                        padding: 8px;
                        font-size: 1em;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                </style>
                <form id="payment-form">
                    <label for="card-number">Card Number:</label>
                    <input type="text" id="card-number" name="card-number" required>
                    <label for="expiry">Expiry Date:</label>
                    <input type="text" id="expiry" name="expiry" required>
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" required>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirm Payment',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const cardNumber = Swal.getPopup().querySelector('#card-number').value;
                const expiry = Swal.getPopup().querySelector('#expiry').value;
                const cvv = Swal.getPopup().querySelector('#cvv').value;

                if (!cardNumber || !expiry || !cvv) {
                    Swal.showValidationMessage(`Please fill out all fields`);
                }

                return { cardNumber, expiry, cvv };
            }
        }).then((paymentResult) => {
            if (paymentResult.isConfirmed) {
                const { cardNumber, expiry, cvv } = paymentResult.value;

                // Optional: Perform payment processing logic here

                // Second Swal for Shipping Details
                Swal.fire({
                    title: 'Shipping Details',
                    imageUrl: '../../assets/images/ship.png',
                    html: `
                    <style>
                        #shipping-form {
                            margin-top: 10px;
                        }
                        #shipping-form label {
                            display: block;
                            margin-bottom: 5px;
                        }
                        #shipping-form input[type="text"] {
                            width: 100%;
                            padding: 8px;
                            font-size: 1em;
                            margin-bottom: 10px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                        }
                    </style>
                    <form id="shipping-form">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address" required>
                        <label for="city">City:</label>
                        <input type="text" id="city" name="city" required>
                        <label for="postal-code">Postal Code:</label>
                        <input type="text" id="postal-code" name="postal-code" required>
                        <label for="country">Country:</label>
                        <input type="text" id="country" name="country" required>
                    </form>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Confirm Shipping',
                    cancelButtonText: 'Cancel',
                    preConfirm: () => {
                        const name = Swal.getPopup().querySelector('#name').value;
                        const address = Swal.getPopup().querySelector('#address').value;
                        const city = Swal.getPopup().querySelector('#city').value;
                        const postalCode = Swal.getPopup().querySelector('#postal-code').value;
                        const country = Swal.getPopup().querySelector('#country').value;

                        if (!name || !address || !city || !postalCode || !country) {
                            Swal.showValidationMessage(`Please fill out all fields`);
                        }

                        return { name, address, city, postalCode, country };
                    }
                }).then((shippingResult) => {
                    if (shippingResult.isConfirmed) {
                        const { name, address, city, postalCode, country } = shippingResult.value;

                        // Optional: Perform shipping processing logic here

                        // Third Swal for Order Confirmation
                        Swal.fire({
                            title: 'Order Confirmed!',
                            imageUrl: '../../assets/images/order-confirmation.png',
                            text: 'Your order has been confirmed and is being processed.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });

                        // Clear cart after successful order confirmation
                        localStorage.removeItem('cart');
                        displayCartItems();
                    }
                });
            }
        });
    });

    // Event listener for clear cart button
    clearCartBtn.addEventListener('click', function() {
        Swal.fire({
            title: 'Clear Cart',
            text: 'Are you sure you want to clear the cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, clear it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart');
                displayCartItems();
                Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
            }
        });
    });

    // Initial call to display cart items on page load
    displayCartItems();
});


function getImageFilename(itemName) {
    const imageMap = {
        'Snow crop': '../../assets/images/newarrivl.jpg',
        'Maxi Dress': '../../assets/images/newarrivl1.webp',
        'Flora Tank Top': '../../assets/images/newarrivl2.jpg',
        'Disty Wrap Pant': '../../assets/images/newarrivl3.webp',
        'Dot Mesh Overlay Skirt': '../../assets/images/newarrivl4.jpg',
        'Squre Crop':'../../assets/images/t1.webp',
        'Pink crop':'../../assets/images/t2.webp',
        'Tube White Top':'../../assets/images/t3.jpg',
        'Skinny Top':'../../assets/images/t4.webp',
        'Zibra Top':'../../assets/images/t5.jpg',
        'Cross X Top':'../../assets/images/shein_floral_criss_cross_top_1667878711_7abe144d_progressive.jpg',
        'Strawberry Top':'../../assets/images/shein_strawberry_lettuce_crop__1695923366_e0cbbcf9_progressive.jpg',
        'Butterfly Jersey Top':'../../assets/images/t6.webp',

        // Add more items as needed
    };

    return imageMap[itemName] || '../../assets/images/default-image.jpg'; // Default image if not found
}


