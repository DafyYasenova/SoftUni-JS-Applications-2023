import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";


const editTemplate= (fruit, onSubmit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                value=${fruit.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                value=${fruit.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${fruit.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${fruit.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx){

    const fruit = await getById(ctx.params.id);

    ctx.render(editTemplate(fruit, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
  
  
      const formData = new FormData(event.target);
  
      const data = Object.fromEntries(formData);
  
      if (data.name == '' || data.imageUrl == '' || data.description == '' || data.nutrition == '') {
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