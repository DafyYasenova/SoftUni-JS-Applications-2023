import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userAuth.js";

const registerTemplate = (onSubmit) => html`
 <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
`;

export function showRegister(ctx) {
  ctx.render(registerTemplate(onSubmit));


  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    try {

      if (userData.email == '' || userData.password == '') {
        return alert('All fields are required!');
      }
      await register(userData.email, userData.password);

      ctx.page.redirect('/dashboard')
    } catch (err) {
      alert(err.message);
    }

  }
}