
function login() {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
        document.getElementById('logout').style.display = 'inline-block';

    } else {
        document.getElementById('logout').style.display = 'none'
    }

    const loginBtnElement = document.querySelector('button');
    loginBtnElement.addEventListener('click', onLogin);
    const notification = document.querySelector('.notification');
    const formElement = document.querySelector('form');


    async function onLogin(event) {
        event.preventDefault();

        const formData = new FormData(formElement);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email) {
            notification.textContent = 'Email is required!';
        } else if (!password) {
            notification.textContent = 'Password is required!';
        }

        if (email && password) {
            try {
                const response = await fetch('http://localhost:3030/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                const data = await response.json();

                // save data in storage:

                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('loggedUser', data.email);
                sessionStorage.setItem('id', data._id);
                window.location = 'index.html';

            } catch (err) {
                notification.textContent = err.message;
            }
        }

onLoad()
    }
}
login();

