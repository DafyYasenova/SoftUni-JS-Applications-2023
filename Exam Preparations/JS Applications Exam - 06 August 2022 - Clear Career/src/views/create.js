import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";

const createTemplate= (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
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
            ctx.page.redirect('/dashboard')
            
        } catch (err) {
            alert(err.message);
        }
}
ctx.render(createTemplate(onSubmit)); 
}