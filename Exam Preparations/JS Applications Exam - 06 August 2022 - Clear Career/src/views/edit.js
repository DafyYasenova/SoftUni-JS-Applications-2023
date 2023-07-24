import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";

const editTemplate= (offer, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              .value=${offer.title}
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
              .value=${offer.imageUrl}
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
              .value=${offer.category}
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
              .value=${offer.description}
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
              .value=${offer.requirements}
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
              .value=${offer.salary}
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
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
  
      if (data.title == '' || data.imageUrl == '' || data.category == '' || data.description == '' ||
       data.requirements == '' || data.salary == '' ) {
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