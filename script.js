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
            nav.css('background-color', 'rgb(3,3,3)');
            nav.css('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');
        }
    });
    // Search functionality
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('.card_title p').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
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

// Function to add item to cart
function addToCart(itemName, itemPrice, quantityId) {
    // Retrieve quantity from input
    let quantity = parseInt(document.getElementById(quantityId).value);

    // Prepare item object
    let item = {
        name: itemName,
        price: itemPrice,
        quantity: quantity
    };

    // Retrieve existing cart items from localStorage or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart based on name
    let existingItem = cartItems.find(i => i.name === itemName);

    if (existingItem) {
        // If item already exists, update quantity
        existingItem.quantity += quantity;
    } else {
        // If item doesn't exist, add it to cart items array
        cartItems.push(item);
    }

    // Save updated cart items back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Show confirmation message (using SweetAlert2 for better user experience)
    Swal.fire({
        icon: 'success',
        title: 'Item added to cart!',
        showConfirmButton: false,
        timer: 1500
    });
}
