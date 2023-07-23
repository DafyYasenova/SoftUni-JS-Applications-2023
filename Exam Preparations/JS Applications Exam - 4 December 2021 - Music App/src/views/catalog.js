import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
import { getUserData } from "../utils.js";


const cardBoxTemplate = (album, user) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
              <p class="name">Name: ${album.name} </p>
              <p class="artist">Artist: ${album.artist} </p>
              <p class="genre">Genre: ${album.genre} </p>
              <p class="price">Price: ${album.price} </p>
              <p class="date">Release Date: ${album.releaseDate} </p>
         </div>
      
         <a href="/details/${album._id}" id="details">Details</a>
         <div class="btn-group">
        </div>
      
     </div>
 </div>`;


const catalogTemplate = (albums) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length > 0 ? albums.map(cardBoxTemplate) : html`
        <p>No Albums in Catalog!</p>`
    }
 </section>
`;

export async function showCatalog(ctx) {
    const albums = await getAllItems()

    const user = getUserData();

    ctx.render(catalogTemplate(albums, ctx.user));

    //     const id = ctx.params.id;
    //    console.log(id)
    //     //const album = await getById(id);

    // todo details hiden button if non user
}