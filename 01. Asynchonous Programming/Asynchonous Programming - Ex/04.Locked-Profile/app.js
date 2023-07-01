async function lockedProfile() {
    const divProfile = document.querySelector('.profile');
    const username = document.querySelector('.user1Username');
    const mainElement = document.getElementById('main');

    const btn = document.getElementsByTagName('button')[0];


    const inputElements = document.querySelectorAll('input');

    username.style.display = 'none';
    mainElement.innerHTML = '';

    const url = `http://localhost:3030/jsonstore/advanced/profiles`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();

    const [btnLock, btnUnlock, userName, email, age] = Array.from(inputElements);

    Object.values(data).forEach((profile) => {

        userName.value = profile.username;
        email.value = profile.email;
        age.value = profile.age;
        btnLock.checked = true;

        const currentDivEl = divProfile.cloneNode(true);

        currentDivEl.addEventListener('click', showMore);
        mainElement.appendChild(currentDivEl)
    })
    function showMore(event) {
        if (event.target.tagName === 'BUTTON' && !event.target.parentElement.children[2].checked) {
            const hiddentElement = event.target.parentElement.children[9];

            if (hiddentElement.style.display === 'block') {
                hiddentElement.style.display = 'none';
                event.target.innerText = 'Show more';
            } else {
                hiddentElement.style.display = 'block';
                event.target.innerText = 'Hide it';
            }
        }

    }

}