import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate= (products) => html`
<h2>Products</h2>
        <section id="dashboard">
          ${products.length > 0
          ? products.map(cardTemplate)
        : html`<h2>No products yet.</h2>`
        }
        </section>
`;

const cardTemplate = (product)=> html` 
<div class="product">
            <img src=${product.imageUrl} alt="example1" />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/details/${product._id}">Details</a>
          </div>`;


export async function showDashboard(ctx){
   

        const products = await getAllItems()
 
    ctx.render(dashboardTemplate(products));
       
}