import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";

const editTemplate= (ev, onSubmit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                value=${ev.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                value=${ev.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                value=${ev.category}
              />
              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${ev.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              value=${ev.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx){

    const offer = await getById(ctx.params.id);

    ctx.render(editTemplate(offer, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
  
  
      const formData = new FormData(event.target);
  
      const data = Object.fromEntries(formData);
 
      if (data.name == '' || data.imageUrl == '' || data.category == '' || data.description == '' ||
       data.date == '' ) {
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