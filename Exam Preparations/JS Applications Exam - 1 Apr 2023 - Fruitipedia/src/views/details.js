import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById} from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate= (fruit, isOwner, onDelete) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${fruit.imageUrl} alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                 ${fruit.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${fruit.nutrition}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
          ${isOwner
          ? html `
               <div id="action-buttons">
            <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
            <a href="" @click=${onDelete} id="delete-btn">Delete</a>
          </div>`
          : nothing}
            </div>
        </div>
      </section>
`;

export async function showDetails(ctx) {

    const id = ctx.params.id;
 
    const fruit = await getById(id);
 
    const user = getUserData();
 
    const isOwner = user ? user.id == fruit._ownerId : false;
    ctx.render(detailsTemplate(fruit, isOwner, onDelete));
 
 
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