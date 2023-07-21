import { html } from "../../node_modules/lit-html/lit-html.js";

const editTemplate= () => html`

`;

export function showEdit(ctx){
    ctx.render(editTemplate());
}