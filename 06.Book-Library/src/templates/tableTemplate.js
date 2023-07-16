import { html } from "../../../node_modules/lit-html/lit-html.js";

export const tableTemplate = () => html`
 <table>
    <thead>
     <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
     </tr>
    </thead>
    <tbody> 
    </tbody>
</table>`

export const tableRowsTemplate = (context) => html`
${context.books.map((book) =>
    rowTemplate(book, context.deleteFunction, context.onEdit))}`

const rowTemplate = (book, onDelete, updateHandler) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${updateHandler.bind(null, book._id)}>Edit</button>
        <button @click=${onDelete.bind(null, book._id)}>Delete</button>
    </td>
</tr>
       `;
