import {page} from '../node_modules/page/page.mjs';
import {html, render} from '../node_modules/lit-html/lit-html.js'; //
import {until} from '../node_modules/lit-html/directives/until.js'; //

import { catalogPage } from './views.js/catalog.js';
import { detailsPage } from './views.js/catalog.js';
import { createPage } from './views.js/catalog.js';
import { editPage } from './views.js/catalog.js';
import { loginPage } from './views.js/catalog.js';
import { registerPage } from './views.js/catalog.js';


import * as api from './api/data.js';
window.api = api;

const root = document.querySelector('.container');



//MidelWhere:
page(decorateContext);

page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/my-furniture', catalogPage);
page('/register', registerPage);

page.start();  


function decorateContext (ctx, next){
ctx.render = (context) => render(context, root);

next();
}