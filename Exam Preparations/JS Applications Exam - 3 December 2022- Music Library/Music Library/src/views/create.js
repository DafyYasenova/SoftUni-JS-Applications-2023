import { html } from "../../node_modules/lit-html/lit-html.js";

const createTemplate= () => html`create

`;

export function showCreate(ctx){
    ctx.render(createTemplate());
}