import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

// ? html`${events.map(cardTemplate)}`

const dashboardTemplate= (events) => html`
<h2>Current Events</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
         ${events.length > 0
        ? events.map(cardTemplate)
      : html`<h4>No Events yet.</h4>`}
        </section>
`;


const cardTemplate = (ev)=> html` 
 <div class="event">
            <img src=${ev.imageUrl} alt="example1" />
            <p class="title">${ev.name}</p>
            <p class="date">${ev.date}</p>
            <a class="details-btn" href="/details/${ev._id}">Details</a>
          </div>`;


export async function showDashboard(ctx){
   
        const events = await getAllItems()
    
    ctx.render(dashboardTemplate(events));
       
}