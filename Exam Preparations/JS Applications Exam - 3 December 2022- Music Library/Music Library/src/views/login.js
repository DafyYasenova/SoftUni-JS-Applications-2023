import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/userAuth.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`;

export function showLogin(ctx) {

    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userData= Object.fromEntries(formData);
        try {

            if (userData.email == '' || userData.password == '') {
                return alert('All fields are required!');
            }
            await login(userData.email, userData.password );

            ctx.page.redirect('/dashboard')
        } catch (err) {
            alert(err.message);
        }

    }
}

