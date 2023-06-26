//1 way: solution whit async-await:

async function getInfo() {

    let idInput = document.getElementById('stopId');
    let id = idInput.value;
    let buses = document.getElementById('buses');

    let divId = document.getElementById('stopName');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

    buses.innerHTML ='';
    try {
        divId.textContent = 'Loading...';

        let response = await fetch(url);

        if (response.status !== 200) {
            throw new Error(`Not Found`)
        }

        let data = await response.json();
        divId.textContent = data.name;

        Object.entries(data.buses).forEach(bus => {
            let newLi = document.createElement('li');
            newLi.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            buses.appendChild(newLi);
        })
    } catch (error){
        divId.textContent = 'Error';

    }
}

