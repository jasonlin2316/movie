var data;
var pageNumber;
var page_num;
var prev;
var next;
var pagination;
var liked_list;
var config;
var modal;
var movie_special = [];
var count_for_like;
var title1;
var title2;
var a1;
var a2;
var a3;
var close_button;

function load_page_number(pageNumber) {
    page_num.textContent = "Page " + pageNumber + "/ Total " + data['total_pages'] + " of " + data['total_results'] + " results";
}


function page_loading(pageNumber) {

    var main = document.getElementById("main-container");
    var loading = document.getElementById("loading");
    main.style.visibility = "hidden";
    loading.style.visibility = "visible";


    var url = "https://api.themoviedb.org/3/movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=" + pageNumber;
    var request = new XMLHttpRequest();
    var promise1 = new Promise(function(resolve, reject) {
        request.onreadystatechange = function() {
            if (request.readyState !== 4) return;
            if (request.status >= 200 && request.status < 300) {
                data = JSON.parse(request.response);
                resolve(data);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        }
        request.open('GET', url, true);
        request.send();
    });

    promise1.then(function(value) {
        data = value;
        load_page_number(pageNumber);
        load_movie_list();
        main.style.visibility = "visible";
        loading.style.visibility = "hidden";
    });
}

function load_movie_list() {

    var movies = document.getElementById("movies");
    movies.innerHTML = "";
    var node;
    var movie;
    var header;
    var link;
    var address = "";
    var title;
    var description;
    var date;
    var date_on;
    var set = data["results"];
    for (let i = 0; i < set.length; i++) {

        node = document.createElement("div");
        node.setAttribute("class", "movie_box");
        header = document.createElement("div");
        header.setAttribute("class", "like_header");
        link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("id", i);
        link.textContent = "Like it!";
        header.appendChild(link);
        movie = document.createElement("img");
        address = "https://image.tmdb.org/t/p/w500";
        address += set[i]["poster_path"];
        movie.setAttribute("src", address);
        movie.setAttribute("class", "poster");
        movie.setAttribute("movie_key", set[i]["id"]);
        title = "";
        title = set[i]["title"];
        description = document.createElement("div");
        description.setAttribute("class", "head");
        description.textContent = title;
        date = "";
        date = set[i]["release_date"];
        date_on = document.createElement("p");
        date_on.textContent = date;
        node.appendChild(header);
        node.appendChild(movie);
        node.appendChild(description);
        node.appendChild(date_on);
        movies.appendChild(node);

    }
    var links = document.querySelectorAll('#movies a');
    count_for_like = document.getElementById("count_like");

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.target.style.color = "purple";
            a2.style.display = "inline";
            count_for_like.style.display = "inline";

            if (check_collect(link.id)) {

                return;
            } else {
                collect_movie(link.id);
            }
            count_for_like.textContent = movie_special.length;
        })
    })
    add_modal();
}

function collect_movie(index) {

    var set = data["results"];
    var movie = {};
    movie.name = set[index]["original_title"];
    movie.img = "https://image.tmdb.org/t/p/w500" + set[index]["poster_path"];
    movie.date = set[index]["release_date"];
    movie.id = set[index]["id"];
    movie_special.push(movie);

}


function check_collect(index) {

    var set = data["results"];
    var add_id = set[index]["id"];

    for (let i = 0; i < movie_special.length; i++) {
        if (add_id == movie_special[i]["id"]) {
            return true;
        }
    }
    return false;
}


function load_liked_list() {

    var liked_list = document.getElementById('like_list');
    liked_list.innerHTML = "";
    var node;
    var movie;
    var title;
    var description;
    var date;
    for (let i = 0; i < movie_special.length; i++) {

        node = document.createElement("div");
        node.setAttribute("class", "movie_box");
        movie = document.createElement("img");
        movie.setAttribute("src", movie_special[i].img);
        movie.setAttribute("class", "poster");
        node.appendChild(movie);
        title = movie_special[i].name;
        description = document.createElement("p");
        description.setAttribute("class", "head");
        description.textContent = title;
        date = "";
        date = movie_special[i].date;
        date_on = document.createElement("p");
        date_on.textContent = date;
        node.appendChild(description);
        node.appendChild(date_on);
        liked_list.appendChild(node);
    }
}

function load_config() {
    config.innerHTML = "";
    var block;
    var name;
    for (let i = 0; i < movie_special.length; i++) {
        block = document.createElement("div");
        name = movie_special[i].name;
        block.textContent = name;
        block.setAttribute("movie_id", movie_special[i].id);
        block.setAttribute("movie_index", i);
        block.setAttribute("draggable", "true");
        block.ondragstart = function(event) {
            event.dataTransfer.setData("text/plain", null);
        };
        block.classList.add("draggable");
        var dropZone = document.createElement("div");
        dropZone.classList.add("dropzone");
        dropZone.appendChild(block);
        config.appendChild(dropZone);

    }
}