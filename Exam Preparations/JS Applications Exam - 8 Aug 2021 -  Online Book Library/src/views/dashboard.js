import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate= (books) => html`
<section id="dashboard-page" class="dashboard">
      <h1>Dashboard</h1>
      ${books.length > 0 
      ?  html`<ul class="other-books-list">${books.map(cardTemplate)}</ul>`
      : html`<p class="no-books">No books in database!</p>`}
</section>`;


const cardTemplate = (book)=> html` 
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type:${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`


export async function showDashboard(ctx){
   
   const books = await getAllItems()
   
  ctx.render(dashboardTemplate(books));
       
}