import {render} from '../../node_modules/lit-html/lit-html.js';
import { getBookById } from './api.js';
import { editFormTemplate } from './templates/formTemplates.js';

export async function onEdit(id){
    document.querySelector("#add-form").style.display = "none";
    const book = await getBookById(id);
    const formElement = document.querySelector("#edit-form");
    formElement.style.display = "block";
    render(editFormTemplate(book, id), formElement);
} 