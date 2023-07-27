import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllLikePerUser, getById, likeById, deleteById, getAllLikes } from "../api/data.js";

const detailsTemplate= (book, likes, user, isLiked, onDelete, onLike) =>{ 
    
  const isOwner = book._ownerId === user?.id;
 return html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type:${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                  
                    ${user && isOwner
                    ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a  @click=${onDelete} class="button" href="">Delete</a>`
                    : nothing}

                    ${user && !isOwner && !isLiked
                    ? html`
                    <a class="button" href="" @click=${onLike}>Like</a>`
                    : nothing}                 
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                   
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>
`;
}
export async function showDetails(ctx) {


    const bookId = ctx.params.id;
   const [ book, likes, isLiked] = await Promise.all([
        getById(bookId),
        getAllLikes(bookId),
        getAllLikePerUser(bookId, ctx.user.id)
    ])
  
  
    ctx.render(detailsTemplate(book, likes, ctx.user, isLiked, onDelete, onLike));
  
  
    async function onDelete() {
  
   
        await deleteById(bookId);
  
        ctx.page.redirect('/dashboard');
     
    }
  
    async function onLike() {
  
      try {
        await likeById({ bookId: book._id });
        ctx.page.redirect('/details/' + bookId)
      } catch (err) {
        console.log(err.message)
      }
  
    }
  }