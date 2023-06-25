function loadRepos() {
	let input = document.getElementById('username');
	let username = input.value;
	let ul = document.getElementById('repos');

	let url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (response.status != 200) {
				throw new Error(`${response.status} ${response.statusText}`)
			}
			return response.json()
		})
		.then(data => {
			ul.innerHTML = '';

			data.forEach(element => {
				let li = document.createElement('li');
				let a = document.createElement('a');

				a.textContent = element.full_name;
				a.href = element.html_url;
				
				li.appendChild(a);
				ul.appendChild(li);
			})
		})
		.catch(e => {
			let li = createLi(e.message);
			ul.appendChild(li);

		})
}
