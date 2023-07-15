import { html, render } from "../node_modules/lit-html/lit-html.js"

document.getElementById('btnLoadTowns').addEventListener('click', onCreate);
const root = document.getElementById('root');


function onCreate(event) {
    event.preventDefault();

    const townsInput = document.getElementById('towns').value;
    const towns = townsInput.split(', ');

    const townTemplate = html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
`;
    render(townTemplate, root);

}