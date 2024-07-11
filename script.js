$(document).ready(function() {
    console.log("Document ready!");

    // Toggle the active class and show/hide the menu
    $('.navTrigger').click(function() {
        $(this).toggleClass('active');
        $("#mainListDiv").toggleClass("show_list");
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
            icon: 'success',
            title: 'Item added to cart',
            text: `Quantity: ${quantity}`
        });
    });
    $(document).ready(function() {
        // Handle click on card links
        $('.card-link').click(function(event) {
            // Prevent default action (e.g., following the link)
            event.preventDefault();

            // Get the URL from the card's href attribute
            var url = $(this).attr('href');

            // Navigate to the URL
            window.location.href = url;
        });
    });

});
