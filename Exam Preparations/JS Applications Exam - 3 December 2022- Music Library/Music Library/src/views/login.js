import { html } from "../../node_modules/lit-html/lit-html.js";

const loginTemplate= () => html`
loginpage
`;

export function showLogin(ctx){
    ctx.render(loginTemplate());
}