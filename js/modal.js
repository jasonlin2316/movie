function add_modal() {
    var movies = document.getElementById("movies");

    var modal = document.createElement("div");
    modal.innerHTML = "";
    modal.setAttribute("id", "modal");

    var modal_loader = document.createElement("div");
    modal_loader.setAttribute("id", "modal_loader");
    modal_loader.style.visibility = "visible";

    var modal_content = document.createElement("id");
    modal_content.setAttribute("id", "modal_content");
    modal_content.style.visibility = "hidden";

    var close_modal = document.createElement("span");
    close_modal.setAttribute("id", "close_modal");
    close_modal.textContent = "CLOSE";


    modal.appendChild(modal_loader);
    modal.appendChild(close_modal);
    modal.appendChild(modal_content);
    movies.appendChild(modal);


    movies.addEventListener('click', function(e) {
        if (e.target.className == "poster") {
            modal.style.display = "block";
            var movie_key = e.target.getAttribute("movie_key");
            load_modal(movie_key);
        }
        if (e.target.id == "close_modal") {
            modal.style.display = "none";
        }
    })
}

function load_modal(movie_key) {

    var modal_content = document.getElementById("modal_content");
    modal_content.innerHTML = "";
    modal_content.style.visibility = "hidden";
    modal_loader.style.visibility = "visible";
    var detail_url = "https://api.themoviedb.org/3/movie/" + movie_key + "?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US";
    var request = new XMLHttpRequest();
    var detail_data;
    var promise1 = new Promise(function(resolve, reject) {
        request.onreadystatechange = function() {
            if (request.readyState !== 4) return;
            if (request.status >= 200 && request.status < 300) {
                detail_data = JSON.parse(request.response);
                resolve(detail_data);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        }
        request.open('GET', detail_url, true);
        request.send();
    });

    promise1.then(function(value) {

        load_modal_content(value);
        modal_loader.style.visibility = "hidden";
        modal_content.style.visibility = "visible";
    });
}

function load_modal_content(detail_data) {

    var modal_content = document.getElementById("modal_content");
    modal_content.innerHTML = "";
    var image = document.createElement("img");
    image.setAttribute("src", "https://image.tmdb.org/t/p/w500" + detail_data['poster_path']);
    modal_content.appendChild(image);

    var data_area = document.createElement("div");
    data_area.setAttribute("class", "data_area");


    var title = document.createElement("h1");
    title.textContent = detail_data['title'] + "(" + detail_data['release_date'].substring(0, 4) + ")";
    data_area.appendChild(title);

    var genre = document.createElement("div");
    genre.setAttribute("class", "genre_box");
    genre.textContent = "";

    for (let i = 0; i < detail_data['genres'].length; i++) {
        var genre_single = document.createElement("div");
        let type = detail_data['genres'][i]['name'];
        genre_single.setAttribute("class", "genre_single");
        genre_single.textContent += type;
        switch (type) {
            case "Thriller":
                genre_single.style.background = "purple";
                break;
            case "Action":
                genre_single.style.background = "red";
                break;
            case "Crime":
                genre_single.style.background = "green";
                break;
            case "Science Fiction":
                genre_single.style.background = "CadetBlue";
                break;
            case "Adventure":
                genre_single.style.background = "Blue";
                break;
            case "Drama":
                genre_single.style.background = "DarkCyan";
                break;
            case "Romance":
                genre_single.style.background = "Gold";
                break;
            case "Music":
                genre_single.style.background = "Magenta";
                break;
            case "Animation":
                genre_single.style.background = "LightPink";
                break;
            case "Family":
                genre_single.style.background = "GoldenRod";
                break;
            case "Comedy":
                genre_single.style.background = "LightSeaGreen";
                break;
            case "Fantasy":
                genre_single.style.background = "Fuchsia";
                break;
            case "Horror":
                genre_single.style.background = "DarkRed";
                break;
            case "Mystery":
                genre_single.style.background = "SlateGray";
                break;
            case "History":
                genre_single.style.background = "DarkRed";
                break;
            case "War":
                genre_single.style.background = "OrangeRed";
                break;
            case "Western":
                genre_single.style.background = "SaddleBrown";
                break;
            default:
                genre_single.style.background = "YellowGreen";
        }

        genre.appendChild(genre_single);
    }
    data_area.appendChild(genre);

    var overview = document.createElement("p");
    overview.textContent = "Overview:  " + detail_data['overview'];
    data_area.appendChild(overview);

    var production_area = document.createElement("div");
    production_area.setAttribute("class", "production_area");

    var company_name;
    var company_logo;
    for (let j = 0; j < detail_data['production_companies'].length; j++) {
        if (detail_data['production_companies'][j]['logo_path'] != null) {
            company_logo = document.createElement("img");
            company_logo.setAttribute("src", "https://image.tmdb.org/t/p/w500" + detail_data['production_companies'][j]['logo_path']);
            production_area.appendChild(company_logo);
        } else {
            company_name = document.createElement("p");
            company_name.textContent = detail_data['production_companies'][j]['name'];
            production_area.appendChild(company_name);
        }
    }

    data_area.appendChild(production_area);
    modal_content.style.backgroundImage = "url(\'https://image.tmdb.org/t/p/w500" + detail_data['backdrop_path'] + "\')";
    modal_content.appendChild(data_area);

}