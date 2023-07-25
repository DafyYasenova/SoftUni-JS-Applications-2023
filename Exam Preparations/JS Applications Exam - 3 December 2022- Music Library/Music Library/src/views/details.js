import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllLikePerUser, getById, likeById, deleteById, getAllLikes } from "../api/data.js";

const detailsTemplate = (alb, likes, user, isLiked, onDelete, onLike) => {

  const isOwner = alb._ownerId === user?.id;

  return html`
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
          <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

          <!--Edit and Delete are only for creator-->
         ${user
      ? html`
              <div id="action-buttons">
                ${!isOwner && !isLiked
          ? html`<a href="" id="like-btn" @click=${onLike}>Like</a>`
          : nothing}
                ${isOwner
          ? html`
                      <a href="/edit/${alb._id}" id="edit-btn">Edit</a>
                      <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                    `
          : nothing}
              </div>
            `
      : nothing}
      </div>
    </section>
  `;
};
export async function showDetails(ctx) {


  const albumId = ctx.params.id;
  const album = await getById(albumId);

  const likes = await getAllLikes(albumId)

  let isLiked = false;
  if (ctx.user) {

    isLiked = getAllLikePerUser(albumId, ctx.user.id)
  }
  ctx.render(detailsTemplate(album, likes, ctx.user, isLiked, onDelete, onLike));


  async function onDelete() {

    try {
      await deleteById(albumId);

      ctx.page.redirect('/dashboard');
    } catch (err) {
      console.log(err.message)
    }
  }

  async function onLike() {

    try {
      await likeById({ albumId: album._id });
      ctx.page.redirect('/details/' + albumId)
    } catch (err) {
      console.log(err.message)
    }

  }
}

