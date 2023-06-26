// 2 way: solutions with fetch -then:
function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let info = document.querySelector('#info span');

    let stop = {
        next: 'depot',
    }

    function depart() {
        departBtn.disabled = true;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                stop = JSON.parse(JSON.stringify(data))
                info.textContent = `Next stop ${stop.name}`;
            })
            .catch((error) => console.log(error))
        arriveBtn.disabled = false;
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        info.textContent = `Arriving at ${stop.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();