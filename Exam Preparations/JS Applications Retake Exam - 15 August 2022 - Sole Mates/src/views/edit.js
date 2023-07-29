import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";



const editTemplate= (product, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onSubmit} class="edit-form">
    <input value=${product.brand} type="text" name="brand" id="shoe-brand" placeholder="Brand"/>
    <input value=${product.model} type="text" name="model" id="shoe-model" placeholder="Model"/>
    <input value=${product.imageUrl} type="text" name="imageUrl" id="shoe-img" placeholder="Image url"/>
    <input value=${product.release} type="text" name="release" id="shoe-release" placeholder="Release date"/>
    <input value=${product.designer} type="text" name="designer" id="shoe-designer" placeholder="Designer"/>
    <input value=${product.value} type="text" name="value" id="shoe-value" placeholder="Value"/>

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

      if (data.brand == '' || data.model == '' || data.imageUrl == '' || data.release == '' ||
       data.designer == '' || data.value == '' ) {
        return;
      }
  
      try {
        await editById(ctx.params.id, data);
        event.target.reset();
        
        ctx.page.redirect('/dashboard'); // path? ///details/' + ctx.params.id
      } catch (err) {
        alert(err.message);
      }
  
    }
  
}