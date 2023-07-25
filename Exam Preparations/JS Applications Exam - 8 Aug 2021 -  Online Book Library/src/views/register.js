import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userAuth.js";

// @submit=${onSubmit}
const registerTemplate= (onSubmit) => html`
 <section id="register-page" class="register">
            <form @submit=${onSubmit} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
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
              if(data.password !== data['confirm-pass']){ // repass have "-"
                  return alert ('Password don\`t match repass')
              }
              await register(data.email, data.password);
         
              ctx.page.redirect('/dashboard');
          } catch (err) {
              alert(err.message);
          }
    
      }
    }