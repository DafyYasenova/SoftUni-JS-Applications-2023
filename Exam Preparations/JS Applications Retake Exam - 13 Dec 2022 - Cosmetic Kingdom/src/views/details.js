import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById, offerById, offerByIdAndUserId, applyById } from "../api/data.js";
import { getUserData } from "../utils.js";

const detailsTemplate= (product, isOwner, onDelete, isLogged, isBuy, boughtCount, onBuy) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${product.imageUrl} alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${boughtCount}</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>
            ${isLogged
            ? html`
            <div id="action-buttons">
                ${isOwner 
                ? html`
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
              : nothing}
              ${!isOwner && isBuy == 0
                ? html `<a href="" @click=${onBuy} id="buy-btn">Buy</a>`
                : nothing}
            </div>`
            : nothing}
          </div>
        </section>
`;

export async function showDetails(ctx){
    const id = ctx.params.id;

  const product = await getById(id);

  const boughtCount = await offerById(id);

  const user = getUserData();

  const isOwner = user ? user.id == product._ownerId : false;
  const isLogged = !user ? false : true;

  let isBuy = 0;

  if (isLogged) {
    isBuy = await offerByIdAndUserId(id, ctx.user.id)
  }

  ctx.render(detailsTemplate(product, isOwner, onDelete, isLogged, isBuy, boughtCount, onBuy));
  
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

  async function onBuy() {
    console.log(product._id)
    await applyById({ productId: product._id });
   
    ctx.page.redirect('/details/' + id)
  }
}