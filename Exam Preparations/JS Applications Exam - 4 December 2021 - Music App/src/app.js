import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';
import { showDetails } from './views/details.js';
import { getUserData } from './utils.js';
import { logout } from './api/userAuth.js';
import { showSearch } from './views/search.js';

const navigationTemplate = (user) => html`
<nav>
                <img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                   <!--Only user-->
                    ${user
                    ? html `
                    <li><a href="/create">Create Album</a></li>
                    <li><a href="/logout">Logout</a></li>`
                    : html`
                     <!--Only guest-->
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    `}
                </ul>
            </nav>
`;

const root = document.querySelector('#main-content');
const rootNav = document.querySelector('.header-nav');

function updateNav(ctx, next) {
    render(navigationTemplate(ctx.user), rootNav);
    next();
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

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/details/:id', showDetails);
page('/logout', onLogout)
page('/search', showSearch);

page.start();