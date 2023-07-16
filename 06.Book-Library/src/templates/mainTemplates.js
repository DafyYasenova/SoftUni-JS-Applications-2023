import { html } from "../../../node_modules/lit-html/lit-html.js";
import { addFormTemplate, editFormTemplate } from "./formTemplates.js";
import { loadBooksTemplate } from "./loadBtnTemplate.js";
import { tableTemplate } from "./tableTemplate.js";

//import { loadBook, onDelete } from "../api.js";

export const mainTemplate =()=>{
    return html`
    ${loadBooksTemplate()} ${tableTemplate()}
        <form id="add-form">${addFormTemplate()}</form>
        <form id="edit-form" style="display: none">$</form>`
}