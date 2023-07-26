import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchById } from '../api/data.js';


const searchTemplate = (fruits = [], onSearch,isInitialRender ) => html`
 <section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button @click=${onSearch} class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
${!isInitialRender
    ? html`
     <div class="search-result">
        ${fruits.length == 0
 ? html`<p class="no-result">No result.</p>`
  : html`${fruits.map(cardMatchTemplate)}`}
      </div>`
: nothing}
        </section>`;

const cardMatchTemplate = (fruit) => html`
<div class="fruit">
<img src=${fruit.imageUrl} alt="example1" />
<h3 class="title">${fruit.name}</h3>
<p class="description">${fruit.description}</p>
<a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`


export function showSearch(ctx) {

    let fruits =[];
    

    async function onSearch(event) {
        event.preventDefault();
        const searchText = document.getElementById('search-input');

        const query = searchText.value;
        if (!query) {
            alert('What are you searching for?');
            return;
        }

        fruits = await searchById(query);

        searchText.value = '';
      ctx.render(searchTemplate(fruits, onSearch));
    }
    ctx.render(searchTemplate(fruits, onSearch, true));
}