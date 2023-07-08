const url = 'http://localhost:3030/jsonstore/collections/books/';

document.getElementById('loadBooks').addEventListener('click', loadBook);

const form = document.querySelector('form');
form.addEventListener('submit', createBook);

const formBtn = form.querySelector('button');

const title = document.querySelector('input[name="title"]');
const author = document.querySelector('input[name="author"]');

const tbody = document.querySelector('tbody');

let id = '';

async function loadBook() {

    const response = await fetch(url)
    const data = await response.json();
    tbody.innerHTML = '';


    Object.entries(data).forEach(book => {

        const trElement = document.createElement('tr');
        trElement.id = book[0];
        const tdTitle = document.createElement('td');
        tdTitle.textContent = book[1].title;

        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = book[1].author;

        const td = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', onEdit);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', onDelete);
        td.appendChild(editBtn);
        td.appendChild(deleteBtn);

        trElement.appendChild(tdTitle);
        trElement.appendChild(tdAuthor);
        trElement.appendChild(td);
        tbody.appendChild(trElement);
    });
}

async function createBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const author = formData.get('author');
    const title = formData.get('title');


    let bookData = {
        author,
        title
    };

    if (formBtn.textContent === "Submit") {
        if (author == '' || title == '') {
            return alert('All fields are required!');
        }
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bookData),
        })

    } else {
        if (author == '' || title == '') {
            return alert('All fields are required!');
        }
        const response = await fetch(`${url}${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(bookData),
        })
    }

    loadBook();
    form.reset()

}


async function onDelete(event) {
    event.preventDefault();

  
    id = event.target.parentNode.parentNode.getAttribute('id');

    const response = await fetch(`${url}${id}`, {
        method: "DELETE",
    });
    
    loadBook();
}

async function onEdit(event) {
    event.preventDefault();

    form.querySelector('h3').textContent = 'Edit FORM';
    id = event.target.parentNode.parentNode.getAttribute('id');
    formBtn.textContent = "Save";

    form.querySelector('input[name=title]').value = event.target.parentNode.parentNode.children[0].textContent;
    form.querySelector('input[name=author]').value = event.target.parentNode.parentNode.children[1].textContent;
    formBtn.addEventListener('click', onSave);


    async function onSave() {
        const title = event.target.parentNode.parentNode.children[0].textContent;
        const author = event.target.parentNode.parentNode.children[1].textContent;

        const response = await fetch(`${url}${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author
            })
        })
    }
}