function register() {

    const registerBtnElement = document.querySelector('button');
    registerBtnElement.addEventListener('click', onRegister);
    const notification = document.querySelector('.notification');


    const formElement = document.querySelector('form');

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(formElement);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        if (!email) {
            notification.textContent = 'Email is required!';
        } else if (!password) {
            notification.textContent = 'Password is required!';
        } else if (password !== rePass) {
            notification.textContent = 'Password and Repeat password is not match!';
        }
        // may by validate email?
        if (email && password && rePass) {
            try {
                const response = await fetch('http://localhost:3030/users/register', {
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

    }
    const accessToken = sessionStorage.getItem('accessToken');
    if(accessToken){
        document.getElementById('logout').style.display = 'inline-block';
    }else{
        document.getElementById('logout').style.display = 'none';
    }
}
register();