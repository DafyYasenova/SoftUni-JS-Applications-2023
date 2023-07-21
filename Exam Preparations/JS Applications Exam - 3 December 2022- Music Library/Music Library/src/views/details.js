import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById } from "../api/data.js";

const detailsTemplate= (alb, user) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${alb.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${alb.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${alb.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${alb.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${alb.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${alb.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

          <!--Edit and Delete are only for creator-->
          ${user && html`
          <div id="action-buttons">
            <a href="" id="like-btn">Like</a>
            <a href="/edit/${alb._id}" id="edit-btn">Edit</a>
            <a href="" id="delete-btn">Delete</a>
          </div>
          `}
        </div>
      </section>
`;

export async function showDetails(ctx){
    
const album = await getById(ctx.params.id)
    ctx.render(detailsTemplate(album, ctx.user));
}