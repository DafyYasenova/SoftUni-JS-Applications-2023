import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";


const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export function showCreate(ctx) {


    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);


        if (Object.values(data).some(x => x == '')) {
            return alert('All fields are required!')
        }

        try {
            await createItem(data);
            ctx.page.redirect('/dashboard') 

        } catch (err) {
            alert(err.message);
        }
    }
    ctx.render(createTemplate(onSubmit));
}