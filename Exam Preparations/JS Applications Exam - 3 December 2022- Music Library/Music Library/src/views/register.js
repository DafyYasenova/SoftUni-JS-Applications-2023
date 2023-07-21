import { html } from "../../node_modules/lit-html/lit-html.js";

const registerTemplate= () => html`register page

`;

export function showRegister(ctx){
    ctx.render(registerTemplate());
}