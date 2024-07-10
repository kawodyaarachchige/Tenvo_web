$(document).ready(function() {
    // Debug to check if script is running
    console.log("Document ready!");

    // Example: Toggle navigation menu
    $('.navTrigger').click(function() {
        $(this).toggleClass('active');
        $("#mainListDiv").toggleClass("show_list");
        // Ensure you're toggling correctly and fadeToggle is working as intended
        $("#mainListDiv").fadeToggle();
    });

    // Function to check if an element is in viewport
    function isElementInViewport(elem) {
        var $elem = $(elem);
        var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html');
        var viewportTop = $(scrollElem).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        var elemTop = Math.round($elem.offset().top);
        var elemBottom = elemTop + $elem.height();
        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
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
});
// Detect scroll event
window.addEventListener('scroll', function() {
    var nav = document.querySelector('.nav');
    // Change background color and box shadow based on scroll position
    if (window.scrollY > 0) {
        nav.style.backgroundColor = '#241916';
        nav.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    } else {
        nav.style.backgroundColor = 'rgba(252, 251, 251, 0.8)';
        nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});
document.addEventListener("DOMContentLoaded", function() {
    var navTrigger = document.querySelector(".navTrigger");
    var mainListDiv = document.querySelector("#mainListDiv");

    navTrigger.addEventListener("click", function() {
        mainListDiv.classList.toggle("show_list");
        navTrigger.classList.toggle("active");
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.previousElementSibling.querySelector('input');
            const quantity = quantityInput.value;
            alert(`Added ${quantity} item(s) to the cart.`);
        });
    });
});
