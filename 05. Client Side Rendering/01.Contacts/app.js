import { html, render } from '../node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';

const contactTemplate = (contact) => html`
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button @click=${onShowDetails} class="detailsBtn">Details</button>
                
                <div class="details" id=${contact.id}>
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div> 
            </div>`

const root = document.getElementById('contacts');

render(contacts.map(contactTemplate), root);


function onShowDetails(event) {
    const moreInfo = event.target.parentElement;
    const details = moreInfo.querySelector('.details');

    if (event.target.textContent === 'Details') {
        details.style.display = 'block';
        event.target.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        event.target.textContent = 'Details';
    }


}