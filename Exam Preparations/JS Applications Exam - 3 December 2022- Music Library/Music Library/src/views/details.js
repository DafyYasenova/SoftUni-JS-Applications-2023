import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate= () => html`

`;

export function showDetails(ctx){
    ctx.render(detailsTemplate());
}