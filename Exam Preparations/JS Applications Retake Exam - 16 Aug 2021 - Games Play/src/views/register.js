import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userAuth.js";


const registerTemplate= (onSubmit) => html`
<section id="register-page" class="content auth">
            <form @submit=${onSubmit} id="register">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
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
              if(data.password !== data['confirm-password']){ 
                  return alert ('Password don\`t match repass')
              }
              await register(data.email, data.password);
       
              ctx.page.redirect('/dashboard');
          } catch (err) {
              alert(err.message);
          }
    
      }
    }