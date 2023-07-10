import { homePage } from "./homePage.js";
import { showView, updateNavBar } from "./utils.js";

const section = document.getElementById('form-login');

const form = section.querySelector('form');


export function loginPage() {
    form.addEventListener('submit', onSubmit);
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    await login(email, password);

    form.reset();
    updateNavBar();
    homePage();
  
}
    async function login(email, password){
        try {
    
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
    
            if (!response.ok) {
                throw new Error(response.statusText);
            }
    
            const user = await response.json();
            sessionStorage.setItem('user', JSON.stringify(user))
    
        } catch (err) {
            alert(err.message)
        }
    
}


