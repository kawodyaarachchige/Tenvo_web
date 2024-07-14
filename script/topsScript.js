// Add event listener to the sort dropdown
document.addEventListener('DOMContentLoaded', function() {
    const sortDropdown = document.getElementById('sort');

    sortDropdown.addEventListener('change', function() {
        const selectedOption = this.value;
        filterTops(selectedOption);
    });

    function filterTops(option) {
        let topsContainer = document.querySelector('.tops-list');
        let tops = Array.from(topsContainer.children);

        switch (option) {
            case 'lowest':
                tops.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                    return priceA - priceB;
                });
                tops.forEach(top => top.style.display = 'flex'); // Ensure all tops are displayed
                break;
            case 'highest':
                tops.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                    return priceB - priceA;
                });
                tops.forEach(top => top.style.display = 'flex'); // Ensure all tops are displayed
                break;
            case 'popular':
                tops.forEach(top => {
                    const isPopular = top.querySelector('.popular').style.display !== 'none';
                    top.style.display = isPopular ? 'flex' : 'none';
                });
                break;
            case 'new':
                // Implement sorting by new arrivals
                break;
            case 'sold-out':
                // Implement filtering for sold-out items
                break;
            default:
                break;
        }

        // Clear existing list and append sorted/filtered items
        while (topsContainer.firstChild) {
            topsContainer.removeChild(topsContainer.firstChild);
        }

        tops.forEach(top => {
            topsContainer.appendChild(top);

            // Add event listener to 'Add to Cart' button
            const addToCartButton = top.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', function() {
                const name = top.querySelector('h3').textContent;
                const price = parseFloat(top.querySelector('.price').textContent.replace('$', ''));
                const quantity = parseInt(top.querySelector('input[name="quantity"]').value);

                addToCart(name, price, quantity);
            });

            // Add event listener to 'Add to Favorites' button
            const favoriteBtn = top.querySelector('.favorite-btn');
            favoriteBtn.addEventListener('click', function() {
                const id = parseInt(favoriteBtn.getAttribute('data-id'));
                addToFavorites(id, top);
            });
        });
    }

    function addToFavorites(id, top) {
        const favoriteBtn = top.querySelector(`.favorite-btn[data-id="${id}"]`);
        const popularSpan = top.querySelector('.popular');
        const name = top.querySelector('h3').textContent;

        if (favoriteBtn.classList.contains('active')) {
            favoriteBtn.classList.remove('active');
            favoriteBtn.querySelector('i').classList.remove('fas');
            favoriteBtn.querySelector('i').classList.add('far');
            popularSpan.style.display = 'none';
            alertFavorite(name, 'removed from');
        } else {
            favoriteBtn.classList.add('active');
            favoriteBtn.querySelector('i').classList.remove('far');
            favoriteBtn.querySelector('i').classList.add('fas');
            popularSpan.style.display = 'block';
            alertFavorite(name, 'added to');
        }
    }

    // Function to simulate adding item to cart (replace with actual cart logic)
    function alertFavorite(name, action) {
        Swal.fire(`Added ${name} to favorites.`, `You can ${action} them anytime.`, 'success');
    }

    // Function to add item to cart and save to localStorage
    function addToCart(name, price, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.name === name);

        if (existingItemIndex !== -1) {
            // Item already in cart, update quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // New item, add to cart
            cart.push({ name, price, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        const total = price * quantity;
        Swal.fire(`Added ${quantity} ${name}(s) to cart. Total: $${total.toFixed(2)}`);
    }
});
