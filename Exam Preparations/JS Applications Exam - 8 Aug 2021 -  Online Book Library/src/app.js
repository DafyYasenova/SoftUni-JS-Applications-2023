import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showDetails } from './views/details.js';

import { getUserData } from './utils.js';
import { logout } from './api/userAuth.js';
import { showMyBooks} from './views/myBooks.js';


const root = document.querySelector('main')
const rootNav = document.querySelector('header'); 

const navigationTemplate = (user) => html`
 
 <nav class="navbar">
    <section class="navbar-dashboard">
       <a href="/dashboard">Dashboard</a>
          ${!user ? html`
      <div id="guest">
      <a class="button" href="/login">Login</a>
      <a class="button" href="/register">Register</a>
     </div>`
        : html `
       <div id="user">
        <span>Welcome, ${user.email}</span>
       <a class="button" href="/myBooks">My Books</a>
      <a class="button" href="/create">Add Book</a>
      <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
      </div>`
        }
  </section>
</nav>
     
`;

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
page(updateNav);

page('/', showDashboard);
page('/myBooks', showMyBooks)
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/details/:id', showDetails);
page('/logout', onLogout);



page.start();
