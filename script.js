console.log('hello')
const api = fetch('https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=golmaal');
const api_url = fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1');
const movieContainer = document.querySelector('.movie-container');
const allCards = document.querySelector('.cards');


const renderMovie = (collection) => {

    collection.results.map( data => {
        let html = `
        <div class="card">
             <a href="${data.backdrop_path}"><img src="${data.backdrop_path}" alt="${data.title}"></a>
            <div class="info">
                <h3>${data.title}</h3>
                <span class="rating">${data.popularity}</span>
            </div>
            <div class="overview">
                <h2>Overview</h2>
                <p>${data.overview}</p>
            </div>
        </div>`;
        allCards.insertAdjacentHTML('beforeend', html);
    })

}


api.then(response => {
    console.log(response)
    return response.json();
}).then(data => {
    console.log(data);
    renderMovie(data);
})