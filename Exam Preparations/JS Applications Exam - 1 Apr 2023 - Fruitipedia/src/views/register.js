import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userAuth.js";

// @submit=${onSubmit}
const registerTemplate= (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
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
          const data = Object.fromEntries(formData);
         
          try {
  
              if (data.email == '' || data.password == '') {
                  return alert('All fields are required!');
              }
              if(data.password !== data['re-password']){ // repass have "-"
                  return alert ('Password don\`t match repass')
              }
              await register(data.email, data.password);
           event.target.reset();
              ctx.page.redirect('/');
          } catch (err) {
              alert(err.message);
          }
    
      }
    }