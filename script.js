$(document).ready(function() {
    // Function to toggle navigation
    function toggleNavigation() {
        var navLinks = $('.navlinks');
        var navTrigger = $('.navTrigger i');

        navLinks.toggleClass('show_list');
        navTrigger.toggleClass('active');
    }

    // Toggle navigation on click
    $('.navTrigger').click(function() {
        toggleNavigation();
    });

    // Function to close navigation
    function closeNavigation() {
        var navLinks = $('.navlinks');
        var navTrigger = $('.navTrigger i');

        if (navLinks.hasClass('show_list')) {
            navLinks.removeClass('show_list');
            navTrigger.removeClass('active');
        }
    }

    // Close navigation on outside click
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.navTrigger').length &&
            !$(event.target).closest('.navlinks').length) {
            closeNavigation();
        }
    });

    // Close navigation on navigation link click
    $('.navlinks li a').click(function() {
        closeNavigation();
    });
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate news items when they enter viewport
    function animateNewsItems() {
        $('#news .news-item').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('animate');
            }
        });
    }

    // Animate news items on page load
    animateNewsItems();

    // Animate news items on scroll
    $(window).scroll(function() {
        animateNewsItems();
    });

    // Change background color and box shadow based on scroll position
    $(window).scroll(function() {
        var nav = $('.nav');
        if ($(window).scrollTop() > 0) {
            nav.css('background-color', '#241916');
            nav.css('box-shadow', '0 4px 8px rgba(0,0,0,0.2)');
        } else {
            nav.css('background-color', 'rgba(252, 251, 251, 0.8)');
            nav.css('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');
        }
    });
// Add to cart
    $('.add-to-cart').click(function() {
        const quantityInput = $(this).closest('.quantity-add-to-cart').find('input[type="number"]');
        const quantity = quantityInput.val();
        Swal.fire({
            title: 'Item added to cart',
            text: `Quantity: ${quantity}`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            Swal.fire({
                title: 'Shipping Details Form',
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
            }).then((result) => {
                if (result.isConfirmed) {
                    const { name, address, city, postalCode, country } = result.value;
                    // Show final confirmation popup for shipping
                    Swal.fire({
                        icon: 'success',
                        title: 'Shipping is confirmed!',
                        text: `Shipping details:
                        Name: ${name},
                        Address: ${address},
                        City: ${city},
                        Postal Code: ${postalCode},
                        Country: ${country}`,
                        imageUrl: 'images/success.png',
                    });
                }
            });
        });
    });
    // Add click event listener to each card link
    $(document).ready(function() {
        $('.card-link').click(function(event) {
            // Prevent default action (e.g., following the link)
            event.preventDefault();
            var url = $(this).attr('href');
            window.location.href = url;
        });
    });

});
