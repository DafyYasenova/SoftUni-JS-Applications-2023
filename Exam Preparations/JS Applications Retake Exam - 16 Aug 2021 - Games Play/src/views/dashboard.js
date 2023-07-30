import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate= (games) => html`
<section id="catalog-page">
   <h1>All Games</h1>
    ${games.length > 0
    ? games.map(cardTemplate)
    : html`<h3 class="no-articles">No articles yet</h3>`}        
</section>
`;


const cardTemplate = (game)=> html` 
<div class="allGames">
<div class="allGames-info">
<img src=${game.imageUrl}>
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>
    <a href="/details/${game._id}" class="details-button">Details</a>
</div>`;


export async function showDashboard(ctx){
  
  const games = await getAllItems();
  ctx.render(dashboardTemplate(games));   
}