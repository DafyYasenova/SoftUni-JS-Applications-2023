import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";


const editTemplate= (product, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              value=${product.name}
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
              value=${product.imageUrl}
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
              value=${product.category}
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
              .value=${product.description}
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              value=${product.price}
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx){

    const product = await getById(ctx.params.id);

    ctx.render(editTemplate(product, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
  
  
      const formData = new FormData(event.target);
  
      const data = Object.fromEntries(formData);
  
      if (data.name == '' || data.imageUrl == '' || data.category == '' || data.description == '' ||
       data.price == '' ) {
        return;
      }
  
      try {
        await editById(ctx.params.id, data);
        event.target.reset();
        
        ctx.page.redirect('/details/' + ctx.params.id); 
      } catch (err) {
        alert(err.message);
      }
  
    }
  
}