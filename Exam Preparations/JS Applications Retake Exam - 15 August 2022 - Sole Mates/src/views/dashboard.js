import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";



const dashboardTemplate= (products) => html`
   <section id="dashboard">
          <h2>Collectibles</h2>
          ${products.length > 0
          ? html`
            <ul class="card-wrapper">
            ${products.map(cardTemplate)}    
          </ul>`
          : html`<h2>There are no items added yet.</h2>`}

        </section>
`;


const cardTemplate = (product)=> html` 
   <li class="card">
              <img src=${product.imageUrl} alt="back2future" />
              <p><strong>Brand: </strong><span class="brand">${product.brand}</span></p>
              <p>
                <strong>Model: </strong
                ><span class="model">${product.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
              <a class="details-btn" href="/details/${product._id}">Details</a>
            </li>`;


export async function showDashboard(ctx){

    const products = await getAllItems()
    ctx.render(dashboardTemplate(products));
}