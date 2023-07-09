import { homePage } from "./homePage.js";
import { loginPage } from "./login.js";
import { register } from "./register.js";
import { logout } from "./logout.js"
import { updateNavBar } from "./utils.js";
//todo:

document.querySelector('nav').addEventListener('click', onNavigate);

// const routes = {
//     'home-nav': homePage,
//     'login-nav': login,
//     'register-nav': register,
//     'logout-nav': logout,

// }

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': register,
    '/logout': logout,
}

function onNavigate(event) {
    event.preventDefault();

    if (event.target.tagName === "A" && event.target.href) {

        const url = new URL(event.target.href);
        const view = routes[url.pathname]
        // const view = routes[event.target.id];
        view()


    }
}
updateNavBar();
homePage();