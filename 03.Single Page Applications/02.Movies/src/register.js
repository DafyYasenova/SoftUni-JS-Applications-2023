import { showView } from "./utils.js";


const section = document.getElementById('form-sign-up');
//const registerForm = document.getElementById('register-form')

export function register() {
   const form = section.querySelector('form').addEventListener('submit', onRegister);
   // registerForm.addEventListener('submit', onRegister);

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');

        if (email === '' || password === '' || rePass === '') {
            alert('All fields are required!');
            return;
        }
        if (password.length < 6) {
            alert('Password should be at more 6 charecters');
            return;
        }
        if (password !== rePass) {
            alert('Password and Repeat password is not match!');
            return
        };

        try {
            const response = await fetch(`http://localhost:3030/users/register`, {
                methods: 'POST',
                headeres: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                section.reset();
                throw new Error(response.statusText);

            }
            const data = await response.json();
            sessionStorage.setItem('accessToken', data.accessToken);
            sessionStorage.setItem('loggedUser', data.email);
            sessionStorage.setItem('id', data._id);

            section.reset()
            showView(section);

        } catch (err) {
            alert(err.message)
        }

    }

}