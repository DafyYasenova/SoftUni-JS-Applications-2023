import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showDetails } from './views/details.js';
import { showSearch } from './views/search.js';
import { getUserData } from './utils.js';
import { logout } from './api/userAuth.js';



const root = document.querySelector('main')
const rootNav = document.querySelector('header'); 

const navigationTemplate = (user) => html`
 
         <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/dashboard">Fruits</a>
            <a href="/search">Search</a>
          </div>

          ${user 
          ? html`
          <div class="user">
            <a href="/create">Add Fruit</a>
            <a href="/logout">Logout</a>
          </div>`
            : html`
        
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>`
          }
          </div>
        </nav>`;

function updateNav(ctx, next) {
  render(navigationTemplate(ctx ? ctx.user : null), rootNav);
  if(next){
  next();
  }
}

function contextMidleware(ctx, next) {
    const user = getUserData();

    if (user) {
        ctx.user = user;
    }
    next();
}

function onLogout() {
  logout();
  updateNav();
  page.redirect('/');
}


function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, root)
    }
    next();

}
page(decorateContext);
page(contextMidleware);
page(updateNav)

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/details/:id', showDetails);
page('/logout', onLogout);
page('/search', showSearch)


page.start();
