document.addEventListener("DOMContentLoaded", function() {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;

            // Close other open accordion contents
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });

            // Toggle display of the current content
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // Close accordion content if click happens outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.accordion-button')) {
            document.querySelectorAll('.accordion-content').forEach(content => {
                content.style.display = 'none';
            });
        }
    });
});

