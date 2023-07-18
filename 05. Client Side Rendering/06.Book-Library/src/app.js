import { render } from "../../node_modules/lit-html/lit-html.js";
import { loadBook, createBook, editBook, deleteBook } from "./api.js";
import { mainTemplate } from "./templates/mainTemplates.js";
import { tableRowsTemplate } from "./templates/tableTemplate.js";
import { onEdit } from "./editHandler.js";

const body = document.querySelector('body');
render(mainTemplate(), body)

document.getElementById('loadBooks').addEventListener('click', async () => {
    const booksData = await loadBook();
    const section = body.querySelector('table tbody');
    const books = [];

    for (const id in booksData) {
        books.push({
            author: booksData[id].author,
            title: booksData[id].title,
            _id: id
        })
    }
    const context = {
        books,
        deleteFunction,
        onEdit
    }


    render(tableRowsTemplate(context), section)
});

const addform = document.querySelector("#add-form").addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(addform);

    const author = formData.get('author');
    const title = formData.get('title');

    let book = {
        author,
        title
    };

    if (author == '' || title == '') {
        return alert('All fields are required!');
    }
    await createBook(book)

    loadBook();
    addform.reset()
})


const editForm = document.querySelector("#edit-form").addEventListener('submit', (event) => {

    event.preventDefault();

    const formData = new FormData(editForm);

    const author = formData.get('author');
    const title = formData.get('title');
    const id = formData.get('id')

    let book = {
        author,
        title, 
        id
    };

    if (author == '' || title == '') {
        return alert('All fields are required!');
    }
    loadBook(),
    editBook(id, book);
    editBook.style.dispa = 'none';
    editBook.reset()
    addform.style.dispay = 'block';

})
function deleteFunction(id) {
    deleteBook(id)
    loadBook();
}
