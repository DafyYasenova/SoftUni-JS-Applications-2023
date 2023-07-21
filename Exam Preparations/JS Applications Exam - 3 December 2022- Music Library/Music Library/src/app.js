import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showDetails } from './views/details.js';
import { getUserData } from './utils.js';
import { logout } from './api/userAuth.js';


const navigationTemplate = (user) => html`
<div>
          <a href="/dashboard">Dashboard</a>
        </div>
${user
        ? html`
        <!-- Logged-in users -->
        <div class="user">
          <a href="/create">Add Album</a>
          <a href="/logout" @click=${onLogout}>Logout</a>
        </div>`
        : html`
        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
`;

const root = document.querySelector('main');
const rootNav = document.querySelector('nav');

function updateNav(ctx, next) {
    render(navigationTemplate(ctx.user), rootNav);
    next();
}

function contextMidlewhere(ctx, next) {
    const user = getUserData();

    if(user){
        ctx.user = user;
    }
    next();
}

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, root)
    }
    next();

}

function onLogout(){
    logout();
    page.redirect('/')
}
page(decorateContext);
page(contextMidlewhere);
page(updateNav);

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/details/:id', showDetails);



page.start();