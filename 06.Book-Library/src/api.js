const url = 'http://localhost:3030/jsonstore/collections/books';

export async function loadBook() {

    const response = await fetch(url);
    const data = await response.json();
    return data;

}

export async function createBook(author, title) {

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({author, title}),
    })
}

export async function editBook (id, author, title){
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({author, title}),
    })
    const data = await response.json()
    return data;
}

export async function getBookById(id){
    const response = await fetch(`${url}/${id}`)
    const data = await response.json()
    return data;
}

export async function deleteBook(id) {

    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    });
    
    loadBook();
}