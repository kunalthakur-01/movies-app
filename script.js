
const api_url = fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1');
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const movieContainer = document.querySelector('.movie-container');
const allCards = document.querySelector('.cards');
const search_movie = document.querySelector('.search_movie');



api_url.then(response => response.json())
    .then(data => {
    renderMovie(data);
})




search_movie.addEventListener('submit', e => {
    e.preventDefault();

    // cl
    allCards.innerHTML = '';

    fetchAPI(e.target[0].value);

    // setTimeout(() => {
    //     allCards.style.opacity = '1';
    // }, 1000);
    e.target[0].value = '';
})


const renderMovie = (collection) => {

    collection.results.map( data => {
        let html = `
        <div class="card">
             <a href="${IMG_PATH + data.poster_path}">
                <img src="${IMG_PATH + data.poster_path}" alt="${data.title}">
             </a>
            <div class="info">
                <h3>${data.title}</h3>
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

const fetchAPI = (movie) => {
    const api = fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${movie}`);

    api.then(response => response.json())
        .then(data => {
        console.log(data);
        renderMovie(data);
    })
}
