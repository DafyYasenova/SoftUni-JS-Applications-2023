import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (albums) => html`
 <section id="dashboard">
        <h2>Albums</h2>
        ${albums.length !== 0
    ? html`
        <ul class="card-wrapper">
          <!-- Display a li with information about every post (if any)-->
          ${albums.map((alb) => html`
          <li class="card">
            <img src=${alb.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${alb.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${alb.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${alb.sales}</span></p>
            <a class="details-btn" href="/details/${alb._id}">Details</a>
          </li>
          `)}
        </ul>
        `
    : html`
        <!-- Display an h2 if there are no posts -->
        <h2>There are no albums added yet.</h2>
        `}
      </section>
`;



export async function showDashboard(ctx) {
  const albums = await getAllItems();

  // check empty collection: ctx.render(dashboardTemplate([]));
  ctx.render(dashboardTemplate(albums));
}