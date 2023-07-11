import { showView } from "./utils.js";
import { detailsPage } from "./details.js";


const section = document.getElementById('home-page');

const catalog = document.getElementById('movies-list');
catalog.addEventListener('click', showCatalog);

async function showCatalog(event){

    if(event.target.tagName === 'BUTTON'){
        event.preventDefault();
        const currentMovieId = event.target.dataset.id;
        detailsPage(currentMovieId);
    }
}
export function homePage(){
 
    showView(section);
    displayMovies();
}

async function displayMovies(){
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview))
}
function createMoviePreview(movie) {
    const liElem = document.createElement("li");
    liElem.className = "card mb-4";
    liElem.innerHTML = `
      <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
      <div class="card-body">
          <h4 class="card-title">${movie.title}</h4>
          <a href="/details/${movie._id}">
              <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
          </a>
      </div>
      <div class="card-footer">
      </div>
    `;
  
    return liElem;
  }

async function getMovies(){
    const response = await fetch('http://localhost:3030/data/movies');
    const movies = await response.json();

    return movies;
}