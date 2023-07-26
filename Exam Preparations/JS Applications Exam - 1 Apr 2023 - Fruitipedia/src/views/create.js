import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";


//<form @submit=${onSubmit} 
const createTemplate= (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form  @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;

export function showCreate(ctx){
   

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        
        if(Object.values(data).some(x=> x=='')){
            return alert('All fields are required!')
        }

        try {
            await createItem(data);
            ctx.page.redirect('/dashboard') //?path
            
        } catch (err) {
            alert(err.message);
        }
}
ctx.render(createTemplate(onSubmit)); 
}