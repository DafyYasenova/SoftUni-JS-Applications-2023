import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";


// <form @submit=${onSubmit}  ,  .value=${offer.title}
const editTemplate= (book, onSubmit) => html`
 <section id="edit-page" class="edit">
            <form @submit=${onSubmit} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value=${book.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${book.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value=${book.type}>
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;

export async function showEdit(ctx){

    const book = await getById(ctx.params.id);

    ctx.render(editTemplate(book, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
  
  
      const formData = new FormData(event.target);
  
      const data = Object.fromEntries(formData);
  // name property
      if (data.title == '' || data.imageUrl == '' || data.type == '' || data.description == '') {
        return;
      }
  
      try {
        await editById(ctx.params.id, data);
        event.target.reset();
        
        ctx.page.redirect('/details/' + ctx.params.id); // path?
      } catch (err) {
        alert(err.message);
      }
  
    }
  
}