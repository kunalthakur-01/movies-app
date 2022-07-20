
const api_url = fetch('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=11');
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const movieContainer = document.querySelector('.movie-container');
const allCards = document.querySelector('.cards');
const search_movie = document.querySelector('.search_movie');
const theme_selector = document.querySelector('#theme-selector');
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const navbar = document.querySelector('nav');
const ul_list = document.querySelector('.ul-list');


// handling menus for responsiveness
navbar.addEventListener('click', (e) => {
    if(e.target.classList.contains('menu')){
        menu.style.opacity = '0';
        close.style.opacity = '1';
        ul_list.style.transform = 'rotate(0deg)';
    }
    else if(e.target.classList.contains('close')){
        close.style.opacity = '0';
        menu.style.opacity = '1';
        ul_list.style.transform = 'rotate(-90deg)';
    }
});


// implementing dark and light theme
theme_selector.addEventListener('click', (e) => {
    console.log(e.target.innerText);
    if(e.target.innerText === 'Dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }
    else if(e.target.innerText === 'Light') {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
    else if(e.target.innerText === 'Default') {
        document.body.classList.remove('light');
        document.body.classList.remove('dark');
    }
});




api_url.then(response => response.json())
    .then(data => {
    renderMovie(data);
});


// handles the error if any
const errorHandling = (mess) => {
    let error = 
    `
    <div class="error-section">
        <h2>${mess}</h2>
    </div>
    `;

    allCards.insertAdjacentHTML('beforeend', error);
}


// input from user
search_movie.addEventListener('submit', e => {
    e.preventDefault();

    // clear the container
    allCards.innerHTML = '';

    // fetch the TMDB API
    fetchAPI(e.target[0].value);

    e.target[0].value = '';
})



// render the movies in the container
const renderMovie = (collection) => {

    collection.results.map( data => {
        let html = `
        <div class="card">
                <img src="${IMG_PATH + data.poster_path}" alt="${data.title}">
            <div class="info">
                <h3>${data.title || data.name}</h3>
                <span class="rating ${data.vote_average.toFixed(1) >= 8.0 ? 'green' : 'orange'}">${data.vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h2>Overview</h2>
                <p>${data.overview}</p>
            </div>
        </div>`;

        if(!data.poster_path) return;

        allCards.insertAdjacentHTML('beforeend', html);
    })

}

// function for fetch API
const fetchAPI = (movie) => {
    const api = fetch(`https://api.themoviedb.org/3/search/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${movie}`);

    api.then(response => {

        if(!response.ok) throw Error('Something Went Wrong⚠️⚠️');
        
        return response.json()
    })
    .then(data => {

        if(data.total_pages === 0) throw Error('Result not found(404)') 

        renderMovie(data);
    })
    .catch(err => {
        console.error(err);
        errorHandling(err);
    })
}
