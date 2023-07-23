import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userAuth.js";

const registerTemplate= (onSubmit) => html`
 <section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(onSubmit));
  
  
    async function onSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
      
        try {

            if (data.email == '' || data.password == '') {
                return alert('All fields are required!');
            }
            if(data.password !== data['conf-pass']){
                return alert ('Password don\`t match repass')
            }
            await register(data.email, data.password);

            ctx.page.redirect('/')
        } catch (err) {
            alert(err.message);
        }
  
    }
  }