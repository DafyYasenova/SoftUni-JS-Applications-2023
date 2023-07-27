import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById, offerById, offerByIdAndUserId, applyById } from "../api/data.js";
import { getUserData } from "../utils.js";


const detailsTemplate = (offer, isOwner, onDelete, isLogged, hasApplied, applyCount, onApply) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${applyCount}</strong></p>

          ${isLogged
    ? html`
            <div id="action-buttons">
            ${!isOwner && hasApplied == 0
        ? html`<a href="" @click=${onApply}id="apply-btn">Apply</a>`
        : nothing}
            ${isOwner
        ? html`
              <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete}id="delete-btn">Delete</a>`
        : nothing}
            </div>   
      `
    : nothing}
          </div>
        </section>
`;

export async function showDetails(ctx) {

  const id = ctx.params.id;
  const offer = await getById(id);
  const applyCount = await offerById(id);

  const user = getUserData();

  const isOwner = user ? user.id == offer._ownerId : false;
  const isLogged = !user ? false : true;
  let hasApplied = 0;

  if (isLogged) {
    hasApplied = await offerByIdAndUserId(id, ctx.user.id)
  }

  ctx.render(detailsTemplate(offer, isOwner, onDelete, isLogged, hasApplied, applyCount, onApply));


  async function onDelete() {

    const confirmed = confirm('Are you sure you want to delete this item?');
    try {
      if (confirmed) {
        await deleteById(id);

        ctx.page.redirect('/dashboard');
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  async function onApply() {

    await applyById({ offerId: offer._id });
    ctx.page.redirect('/details/' + id);
  }
}