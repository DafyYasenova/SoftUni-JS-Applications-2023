import page from '../node_modules/page/page.mjs'
import { render} from '../node_modules/lit-html/lit-html.js'; 
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api.js';
import { getUserData } from './util.js';


// import * as api from './api/data.js';
// window.api = api;

const root = document.querySelector('.container');

//Midlewhere:
page(decorateContext);

page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/my-furniture', catalogPage);
page('/register', registerPage);


updateUserNav();
page.start();  


function decorateContext (ctx, next){
ctx.render = (context) => render(context, root);
ctx.updateUserNav = updateUserNav;

next();

}

function updateUserNav(){
    const userData = getUserData();
    
    if (userData){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', onLogout);

async function onLogout (){
await logout();
updateUserNav();
page.redirect('/');
}