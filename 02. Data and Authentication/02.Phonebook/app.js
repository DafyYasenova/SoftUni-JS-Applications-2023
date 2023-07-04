function attachEvents() {
    const phonebook = document.getElementById('phonebook');
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', onLoad);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', onCreate)

    const url = `http://localhost:3030/jsonstore/phonebook`;

    async function onLoad() {
        phonebook.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(data => {
            // const person = data.person;
            // const phone = data.phone;
            // const id = data._id;
            const { person, phone, _id } = data;
            const liElement = createElement('li', `${person}: ${phone}`, phonebook);
            liElement.setAttribute('id', _id);

            const deleteBtn = createElement('button', 'Delete', liElement);
            deleteBtn.setAttribute('id', 'deleteBtn');
            deleteBtn.addEventListener('click', onDelete);
        })
    }
    async function onDelete(event) {
        const id = event.target.parentNode.id;
        event.target.parentNode.remove(); // изтриваме го от Дом
        // изтриваме го с делийт заявка и от сървъра
        const deleteResponse = await fetch(`${url}/${id}`, {
            method: "DELETE",
        })
    }
    async function onCreate() {
        if (person.value !== '' && phone.value !== '') {
            const obj = {
                person: person.value,
                phone: phone.value,
            }
            const createResponse = await fetch(url, {
                method: "POST",
                'Content-type': 'application/json',
                body: JSON.stringify(obj)
            })

            person.value = '';
            phone.value = '';
        }
        onLoad();
    }
    function createElement(type, text, appendParent) {
        const element = document.createElement(type);
        element.textContent = text;
        appendParent.appendChild(element);
        return element;
    }
}


attachEvents();