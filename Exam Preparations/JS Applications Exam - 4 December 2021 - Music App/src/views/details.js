import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById } from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (album, isOwner, onDelete) =>
   html`
 <section id="detailsPage">
    <div class="wrapper">
         <div class="albumCover">
              <img src="${album.imgUrl}">
        </div>
     <div class="albumInfo">
         <div class="albumText">
            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: ${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>Description: ${album.description}</p>
         </div>
            <!-- Only for registered user and creator of the album-->
        ${isOwner
         ? html`<div class="actionBtn">
            <a href="/edit/${album._id}" class="edit">Edit</a>
            <a href="" @click=${onDelete} class="remove">Delete</a>
        </div>`
         : nothing
      }
    </div>
 </div>
</section>
`;
export async function showDetails(ctx) {

   const id = ctx.params.id;

   const album = await getById(id);

   const user = getUserData();

   const isOwner = user ? user.id == album._ownerId : false;
   ctx.render(detailsTemplate(album, isOwner, onDelete));


   async function onDelete() {
      
      const confirmed = confirm('Are you sure you want to delete this item?');
      try {
         if (confirmed) {
            await deleteById(id);

            ctx.page.redirect('/catalog');
         }
      } catch (err) {
         console.log(err.message)
      }
   }
}

