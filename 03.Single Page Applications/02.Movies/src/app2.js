import { homePage } from "./homePage.js";
import { login } from "./login.js";
import { register } from "./register.js";
import {logout} from ""
import { updateNavBar } from "./utils.js";


document.querySelector('nav').addEventListener('click', onNavigate);

const routes = {
    'home-nav': homePage,
    'login-nav': login,
    'register-nav': register,
    //'logout-nav': logout,

}

function onNavigate(event) {
    event.preventDefault();

    if (event.target.tagName === "A" /* & event.target.href*/) {

        // const url = new URL(event.target.href);
        const view = routes[event.target.id];
        view()


    }
}
updateNavBar();
homePage();