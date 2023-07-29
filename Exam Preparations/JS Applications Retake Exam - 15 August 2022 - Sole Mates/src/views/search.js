import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchById } from '../api/data.js';
import { getUserData } from "../utils.js";


const searchTemplate = (products = [], onSearch,isInitialRender ) => html`
  <section id="search">
     <h2>Search by Brand</h2>

     <form class="search-wrapper cf">
      <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button @click=${onSearch} type="submit">Search</button>
     </form>

     <h3>Results:</h3>
      ${!isInitialRender
      ? html`
      <div id="search-container">
      ${products.length == 0
       ? html`<h2>There are no results found.</h2>`
       : html`<ul class="card-wrapper">
       ${products.map(cardTemplate)}</ul>`}
          
      </div>`
      : nothing}
   </section>`;

const cardTemplate = (product) => html`

<li class="card">
    <img src=${product.imageUrl} alt="travis" />
<p>
     <strong>Brand: </strong><span class="brand">${product.brand}</span>
</p>
<p>
    <strong>Model: </strong><span class="model">${product.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
<a class="details-btn" href="/details/${product._id}">Details</a>
</li>`;


export function showSearch(ctx) {

    let products =[];
    
    async function onSearch(event) {
        event.preventDefault();
        const searchText = document.getElementById('#search-input');

        const query = searchText.value;
        if (!query) {
            alert('What are you searching for?');
            return;
        }

        products = await searchById(query);
       

        searchText.value = '';
      ctx.render(searchTemplate(products, onSearch));
    }
    ctx.render(searchTemplate(products, onSearch, true));
}