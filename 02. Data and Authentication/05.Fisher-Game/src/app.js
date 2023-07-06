function app() {
    const accessToken = sessionStorage.getItem('accessToken');
    const loggedUserEmail = sessionStorage.getItem('loggedUser');
    const addBtnElement = document.getElementsByClassName('add')[0];
    addBtnElement.addEventListener('click', onAdd);
    const addFormElement = document.getElementById('addForm')


    // Welcome, guest/name:
    if (loggedUserEmail) {
        document.querySelector('span').textContent = loggedUserEmail;
    } else {
        document.querySelector('span').textContent = 'guest';
    }


    if (accessToken) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('logout').style.display = 'inline-block';

        addBtnElement.disabled = false;
    } else {
        document.getElementById('login').style.display = 'inline-block';
        document.getElementById('register').style.display = 'inline-block';
        document.getElementById('logout').style.display = 'none';
        addBtnElement.disabled = true;
    }

    // LOGOUT:
    document.getElementById('logout').addEventListener('click', onLogout);

    async function onLogout() {
        await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': accessToken,
            },
        });

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('loggedUser');
        sessionStorage.removeItem('id');

        window.location = 'index.html';

    }



    const catchesDivEl = document.getElementById('catches');

    Array.from(catchesDivEl.children).forEach(child => child.remove());


    const loadButtonEl = document.getElementsByClassName('load')[0];
    loadButtonEl.addEventListener('click', onLoad);



    async function onLoad() {

        Array.from(catchesDivEl.children).forEach(child => child.remove());

        const response = await fetch('http://localhost:3030/data/catches')
        let catches = await response.json();


        for (const currentCatch of catches) {
            const catchEl = createElement('div', '', catchesDivEl, { class: 'catch' })

            const anglerLabelEl = createElement('label', 'Angler', catchEl, {});
            const anglerInput = createElement('input', '', catchEl, { type: "text", class: "angler", value: currentCatch.angler });
            const weightLabelEl = createElement('label', 'Weight', catchEl, {});
            const weightInput = createElement('input', '', catchEl, { type: "text", class: "weight", value: currentCatch.weight });
            const speciesLabelEl = createElement('label', 'Species', catchEl, {});
            const speciesInput = createElement('input', '', catchEl, { type: "text", class: "species", value: currentCatch.species });
            const locationLabelEl = createElement('label', 'Location', catchEl, {});
            const locationInput = createElement('input', '', catchEl, { type: "text", class: "location", value: currentCatch.location });
            const baitLabelEl = createElement('label', 'Bait', catchEl, {});
            const baitInput = createElement('input', '', catchEl, { type: "text", class: "bait", value: currentCatch.bait });
            const captureTimeLabelEl = createElement('label', 'Capture Time', catchEl, {});
            const captureTimeInput = createElement('input', '', catchEl, { type: "text", class: "captureTime", value: currentCatch.captureTime });
            const updateBtn = createElement('button', 'Update', catchEl, { class: "update", "data-id": currentCatch._id });
            updateBtn.addEventListener('click', onUpdate);
            const deleteBtnEl = createElement('button', 'Delete', catchEl, { class: "delete", "data-id": currentCatch._id });
            deleteBtnEl.addEventListener('click', onDelete);

            catchesDivEl.appendChild(catchEl);

            // ако записа не е на узъра, който е логнат, бутоните трябва да са дисейбълд
            const loggedUserID = sessionStorage.getItem('id');
            if (loggedUserID !== currentCatch._ownerId) {
                updateBtn.disabled = true;
                deleteBtnEl.disabled = true;
            }
        }
    }


    async function onUpdate(event) {
        event.preventDefault();
        // взимаме ДИВ-а, който държи всички елементи в попълнената форма
        const divCatchELement = event.target.parentElement;
        const id = event.target.dataset.id;
        let [angler, weight, species, location, bait, captureTime] = divCatchELement.querySelectorAll('input');

        const url = `http://localhost:3030/data/catches/${id}`;
        console.log(accessToken)
        console.log(id)
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': accessToken
                },
                body: JSON.stringify({
                    angler: angler.value,
                    weight: Number(weight.value),
                    species: species.value,
                    location: location.value,
                    bait: bait.value,
                    captureTime: Number(captureTime.value),
                }),
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(response.message);
            }
            onLoad()
        } catch (err) {
            alert(err.message)
        }
    }


    async function onDelete(event) {

        const id = event.target.dataset.id // взимаме ИД на логнатия узър
        const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'DELETE',
            headers: {
                "X-Authorization": accessToken
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        await onLoad();
    }

    async function onAdd(event) {
        event.preventDefault();

        const formData = new FormData(addFormElement);
        const angler = formData.get('angler');
        const weight = formData.get('weight');
        const species = formData.get('species');
        const location = formData.get('location');
        const bait = formData.get('bait');
        const captureTime = formData.get('captureTime');

        if (!angler) {
            alert('Angler is required!')
        } else if (!weight) {
            alert('Weigth is required!')
        } else if (!species) {
            alert('Species is required!')
        } else if (!location) {
            alert('Location is required!')
        } else if (!bait) {
            alert('Bait is required!')
        } else if (!captureTime) {
            alert('Capture Time is required!')
        }

        if (angler && weight && species && location && bait && captureTime) {
            try {
                const response = await fetch('http://localhost:3030/data/catches', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Authorization": accessToken,
                    },
                    body: JSON.stringify({
                        angler,
                        weight,
                        species,
                        location,
                        bait,
                        captureTime,
                    }),
                });
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                // зачистване на формата:
                Array.from(addFormElement.querySelectorAll('input')).forEach(input => input.value = '')

                await onLoad();
            } catch (err) {
                alert(err.message)
            }
        }

    }
    function createElement(type, text, appendParent, attributes) {
        const element = document.createElement(type);
        element.textContent = text;
        appendParent.appendChild(element);

        for (const [attribute, value] of Object.entries(attributes)) {
            element.setAttribute(attribute, value)
        }
        return element;
    }
}
app();