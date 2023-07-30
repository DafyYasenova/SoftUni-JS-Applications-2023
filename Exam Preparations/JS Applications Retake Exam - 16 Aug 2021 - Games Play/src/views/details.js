import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById, getAllCommentsForGame, createNewComment } from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate= (game, isOwner, onDelete, isLogged, comments, onComment) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">${game.summary}</p>
                <div class="details-comments">
        ${html`<h2>Comments:</h2>
            ${comments.length > 0
            ? html`<ul>${commentsCount.map(commentTemplate)}</ul>`
            : html`<p class="no-comment">No comments.</p>`}
        `}  
    </div>
               
        ${isOwner
        ? html `
         <div class="buttons">
             <a href="/edit/${game._id}" class="button">Edit</a>
             <a href="" @click=${onDelete} class="button">Delete</a>
                </div>`
                : nothing}
            </div>

            ${isLogged && !isOwner
            ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>`
                : nothing}
            </article>

        </section>
`;


const commentTemplate = (comment) => html`
<li class="comment">
<p>Content: ${comment.comment}</p>
</li>`;


export async function showDetails(ctx) {

    const id = ctx.params.id;
 

    const game = await getById(id);
    const comments = getAllCommentsForGame(id);
      const user = getUserData();
    
      const isOwner = user ? user.id == game._ownerId : false;
      const isLogged = !user ? false : true;
    
      
    
     
      ctx.render(detailsTemplate(game, isOwner, onDelete, isLogged, comments, onComment));
      
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
    
      async function onComment(event) {
       event.preventDefault();
       const gameId = ctx.params.id;
       const formData =  new FormData(event.target);
       const comment = formData.get('comment')
       if(!comment){
        alert ('Enter comment');
        return;
       }
       
        await createNewComment(gameId, comment);
        event.target.reset();
       
        ctx.page.redirect(`/details/${game._id}`)
      }
    }