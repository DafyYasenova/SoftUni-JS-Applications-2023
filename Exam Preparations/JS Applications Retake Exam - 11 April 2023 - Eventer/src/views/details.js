import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById, eventById, eventCount, eventByUser } from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (ev, isOwner, onDelete, isLogged, isGoing, goingCount, onGoing) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${ev.imageUrl} alt="example1" />
            <p id="details-title">${ev.name}</p>
            <p id="details-category">
              Category: <span id="categories">${ev.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${ev.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${ev.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${goingCount}</span> times.</h3>

            ${isLogged
    ? html`
            <div id="action-buttons">
              ${isOwner
        ? html`
              <a href="/edit/${ev._id}" id="edit-btn">Edit</a>
              <a href="" @click=${onDelete}id="delete-btn">Delete</a>`
        : nothing}
              ${!isOwner && isGoing == 0
        ? html`
              <a href="" @click=${onGoing} id="go-btn">Going</a>`
        : nothing}
            </div>`
    : nothing}
          </div>
        </section>
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;

  const ev = await getById(id);

  const goingCount = await eventCount(id);

  const user = getUserData();

  const isOwner = user ? user.id == ev._ownerId : false;
  const isLogged = !user ? false : true;

  let isGoing = 0;

  if (isLogged) {
    isGoing = await eventByUser(id, ctx.user.id)
  }

  ctx.render(detailsTemplate(ev, isOwner, onDelete, isLogged, isGoing, goingCount, onGoing));
  
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

  async function onGoing() {
    await eventById({ eventId: ev._id });
    console.log(id)
    console.log(ev._id)
    ctx.page.redirect('/details/' + id)
  }
}