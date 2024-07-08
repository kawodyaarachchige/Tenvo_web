$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

function searchFunction() {
    let query = document.querySelector('.search-input').value;
    window.location.href = `https://www.google.com/search?q=${query}`;
}