import { html} from "../../node_modules/lit-html/lit-html.js";
import { searchById } from '../api/data.js';

const searchTemplate = (items = [], onSearch) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>

<!--Show after click Search button-->
<div class="search-result">
    ${items.length == 0
        ? html`
    <p class="no-result">No result.</p>`
        : html`${items.map(album => cardMatchTemplate(album))}`
        }
</div>
</section>`


const cardMatchTemplate = (album) => html`
<div class="card-box">
<img src=${album.imgUrl} >
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: ${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    <div class="btn-group">
        <a href="/details/${album._id}" id="details">Details</a>
    </div>
</div>`
export function showSearch(ctx) {

    let items = '';

    async function onSearch() {
        // event.preventDefault();
        const searchText = document.getElementById('search-input');

        const query = searchText.value;
        if (!query) {
            alert('What are you searcing for?');
            return;
        }

        items = await searchById(query);
        console.log(items);

        searchText.value = '';

    }
    ctx.render(searchTemplate(items, onSearch));
}
