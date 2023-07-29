import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById } from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate= (product, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${product.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${product.brand}</span></p>
              <p>
                Model: <span id="details-model">${product.model}</span>
              </p>
              <p>Release date: <span id="details-release">${product.release}</span></p>
              <p>Designer: <span id="details-designer">${product.designer}</span></p>
              <p>Value: <span id="details-value">${product.value}</span></p>
            </div>

            ${isOwner
            ? html`
            <div id="action-buttons">
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a href="" @click=${onDelete} id="delete-btn">Delete</a>
            </div>`
            : nothing}
          </div>
        </section>
`;

export  async function showDetails(ctx){
    const id = ctx.params.id;
 
    const product = await getById(id);
 
    const user = getUserData();
 
    const isOwner = user ? user.id == product._ownerId : false;
    ctx.render(detailsTemplate(product, isOwner, onDelete));
 
 
    async function onDelete() {
       
       const confirmed = confirm('Are you sure you want to delete this item?');
       try {
          if (confirmed) {
             await deleteById(id);
 
             ctx.page.redirect(`/`);
          }
       } catch (err) {
          console.log(err.message)
       }
    }
 }