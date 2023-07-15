import { towns } from './towns.js';
import { html, render } from "../node_modules/lit-html/lit-html.js"


const townsDiv = document.querySelector('#towns');

const townsTemplate = html`
   <ul>
      ${towns.map(town => html`
         <li>${town}</li>`)}
   </ul>
   `;
render(townsTemplate, townsDiv)

document.querySelector('button').addEventListener('click', search);

let counter = 0;

function search() {
   const searchText = document.querySelector('#searchText').value;
   const result = document.querySelector('#result');

  const searchElement =  Array.from(document.querySelectorAll('#towns li')).forEach(town => {
      if (town.textContent.includes(searchText)) {
         town.className = 'active';
         counter++;
      }
   })
   result.textContent = `${counter} matches found`;
}
