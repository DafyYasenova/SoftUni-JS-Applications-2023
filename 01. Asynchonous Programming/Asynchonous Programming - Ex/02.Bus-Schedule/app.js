// 1 way: solution with async, await:
function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let info = document.querySelector('#info span');

    let stop = {
        next: 'depot',
    }

    async function depart() {
        departBtn.disabled = true;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        let response = await fetch(url);
        if (response.status !== 200) {
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            throw new Error('Error');
        }
        stop = await response.json();
        info.textContent = `Next stop ${stop.name}`;

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


