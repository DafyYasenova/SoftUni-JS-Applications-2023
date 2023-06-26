// 2 way: solution with fetch, then:
function getInfo() {

    let idInput = document.getElementById('stopId');
    let id = idInput.value;
    let buses = document.getElementById('buses');

    let divId = document.getElementById('stopName');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

    buses.innerHTML = '';
    divId.textContent = 'Loading...';

    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(`Not Found`)
            }
            return response.json();
        })

        .then((data) => {

            Object.entries(data.buses).forEach(bus => {
                let newLi = document.createElement('li');
                newLi.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
                buses.appendChild(newLi);
            });
            divId.textContent = data.name
        })
        .catch((error) => {
            divId.textContent = 'Error';
        });
}