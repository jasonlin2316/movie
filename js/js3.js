document.addEventListener("DOMContentLoaded", function(event) {
    init();
});
title1 = document.getElementById("title");
title2 = document.getElementById("like_list_head");

function init() {
    liked_list = document.getElementById('like_list');
    pagination = document.getElementById('pagination');
    config = document.getElementById("config");

    pageNumber = 1;
    page_num = document.getElementById("pageNumber");
    page_loading(pageNumber);


    prev = document.getElementById("prev");
    prev.addEventListener('click', function(e) {
        e.preventDefault();
        if (pageNumber > 1) {
            pageNumber--;
            page_loading(pageNumber);
            if (pageNumber === 1) {
                prev.disabled = true;
                prev.textContent = 'No More';
            }
        } else {

        }
    })

    next = document.getElementById("next");
    next.addEventListener('click', function(e) {
        e.preventDefault();
        pageNumber++;
        page_loading(pageNumber);
        prev.disabled = false;
        prev.textContent = "Prev";
    })

    a1 = document.getElementById('a1');
    a1.addEventListener('click', function(e) {
        e.preventDefault();
        title1.textContent = "The Most Popular Movies";
        title1.style.display = "block";
        title2.textContent = "";
        movies.style.display = "flex";
        movies.style.transform = "rotateY(0deg)";
        movies.style.transition = "all 0.5s ease"
        movies.style.height = 'auto';
        liked_list.style.display = "none";
        config.style.display = "none";
        a1.style.borderBottom = "3px solid red";
        a2.style.borderBottom = "none";
        a3.style.display = "none";
        pagination.style.display = "flex";
    })



    a2 = document.getElementById('a2');
    a2.addEventListener('click', function(e) {
        e.preventDefault();
        title1.style.display = 'none';
        title2.textContent = "Liked List";
        title2.style.display = "block";
        movies.style.transform = "rotateY(90deg)";
        movies.style.transition = "all 0.5s ease";
        movies.style.height = '0';
        liked_list.style.display = "block";
        a1.style.borderBottom = "none";
        a2.style.borderBottom = "3px solid red";
        a3.style.display = "block";
        pagination.style.display = "none";
        load_liked_list();
    })


    a3 = document.getElementById('a3');
    a3.addEventListener('click', function(e) {
        e.preventDefault();
        title1.textContent = "";
        title2.textContent = "";
        movies.style.display = "none";
        liked_list.style.display = "none";
        config.style.display = "block";
        navbar.style.display = "none";
        close_button.style.display = "block";
        pagination.style.display = "none";
        load_config();
    })


    close_button = document.getElementById('close');
    close_button.addEventListener('click', function(e) {
        e.preventDefault();
        title2.textContent = "Liked List";
        title2.style.display = 'block';
        movies.style.display = "none";
        liked_list.style.display = "block";
        config.style.display = "none";
        navbar.style.display = "block";
        close_button.style.display = "none";
        a1.style.textDecoration = "none";
        a2.style.borderBottom = "3px solid red";

        pagination.style.display = "none";
        load_liked_list();
    })

}