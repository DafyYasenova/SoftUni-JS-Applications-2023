import { html } from "../../node_modules/lit-html/lit-html.js";
import { editById, getById } from "../api/data.js";

const editTemplate = (alb, onSubmit) => html`
 <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onSubmit}>
          
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${alb.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" value=${alb.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${alb.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" value=${alb.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" value=${alb.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${alb.sales} />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export async function showEdit(ctx) {

  const album = await getById(ctx.params.id);

  ctx.render(editTemplate(album, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();


    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

    if (data.singer == '' || data.album == '' || data.release == '' || data.imageUrl == '' || data.label == '' || data.sales == '') {
      return;
    }

    try {
      await editById(ctx.params.id, data);
      ctx.page.redirect('/edit/' + ctx.params.id)
    } catch (err) {
      alert(err.message)
    }

  }
}