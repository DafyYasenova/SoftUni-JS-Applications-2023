import { html, render } from "../node_modules/lit-html/lit-html.js"

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getItems() {
    const response = await fetch(url);

    const data = await response.json();

    return data;
}

const items = Object.values(await getItems());

const itemTemplate = html`
${items.map(item => html`<option
value=${item._id}>${item.text}</option>`)}`;


const dropDown = document.querySelector('#menu');

render(itemTemplate, dropDown);


document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function addItem() {
    // event.preventdefault();
    const inputField = document.getElementById('itemText').value;

    if (inputField !== '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputField })
        });

    }
}