import { html, render } from "../node_modules/lit-html/lit-html.js"
import { cats } from "./catSeeder.js";

const collectionCats = document.getElementById('allCats');


const catTemplate = (infoCat) => html`
<li>
    <img src="./images/${infoCat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${infoCat.id}">
            <h4>Status Code: ${infoCat.statusCode}</h4>
            <p>${infoCat.statusMessage}</p>
        </div>
    </div>
 </li>
 `;

const catsTemplate = cats.map(catTemplate);

render(html`<ul>${catsTemplate}</ul>`, collectionCats);

const li = document.querySelectorAll('li');
Array.from(li).forEach(li =>{
    li.addEventListener('click', onClick)
})
function onClick(event) {
if(event.target.tagName === 'BUTTON'){
    
    const div = event.target.parentNode.querySelector('.status');

    const btn = event.target.parentNode.querySelector('.showBtn')

    if (div.style.display === 'block') {
        div.style.display = 'none';
        btn.textContent = 'Show status code';
    } else {
        div.style.display = 'block';
        btn.textContent = 'Hide status code';
    }

}  
}