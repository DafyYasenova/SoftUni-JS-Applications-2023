async function loadStudents() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onSubmit);

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(student => {
        const firstName = student.firstName;
        const lastName = student.lastName;
        const facultyNumber = student.facultyNumber;
        const grade = Number(student.grade);

        const tr = document.createElement('tr');
        const fNameTd = createElement('td', firstName, tr);
        const lNameTd = createElement('td', lastName, tr);
        const fNumberTd = createElement('td', facultyNumber, tr);
        const gradeTd = createElement('td', grade, tr);

        // const fNameTd = tr.insertCell(0); 
        // fNameTd.textContent = firstName;
        table.appendChild(tr)

    })

    async function onSubmit(event) {
        event.preventDefault();

        const firstNameInput = document.querySelector('input[name="firstName"');
        const lastNameInput = document.querySelector('input[name="lastName"');
        const facultyNumberInput = document.querySelector('input[name="facultyNumber"');
        const gradeInput = document.querySelector('input[name="grade"');

        const firstName =  firstNameInput.value;
        const lastName =  lastNameInput.value;
        const facultyNumber = facultyNumberInput.value;
        const grade = gradeInput.value;
        if (firstName == '' || lastName === '' || facultyNumber == '' || grade == '') {
            alert('Input fields are required!')
        }
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                facultyNumber,
                grade: Number(grade),
            }),
        })
        const data = await response.json();
        const tr = document.createElement('tr');
        const fNameTd = createElement('td', firstName, tr);
        const lNameTd = createElement('td', lastName, tr);
        const fNumberTd = createElement('td', facultyNumber, tr);
        const gradeTd = createElement('td', grade, tr);

        table.appendChild(tr)

        firstNameInput.value= '';
        lastNameInput.value= '';
        facultyNumberInput.value= '';
        gradeInput.value= '';
    }
    function createElement(type, text, appendParent) {
        const element = document.createElement(type);
        element.textContent = text;
        appendParent.appendChild(element);
        return element;
    }
}
loadStudents()
