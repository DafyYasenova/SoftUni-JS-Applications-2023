async function attachEvents() {
    const url = `http://localhost:3030/jsonstore/messenger`;

    document.getElementById('submit').addEventListener('click', onSend);
    document.getElementById('refresh').addEventListener('click', onRefresh);

    const textArea = document.getElementById('messages');


    async function onSend() {

        const author = document.querySelector('input[name="author"]');
        const content = document.querySelector('input[name="content"]');
       
        let object = {
            author: author.value,
            content: content.value
        }

        author.value = '';
        content.value = '';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })
        const data = await response.json();

    }

    async function onRefresh() {
        const response = await fetch(url);
        const data = await response.json();

        const content = Object.values(data).map(({ author, content }) =>
            (`${author}: ${content}`))
        textArea.textContent = content.join('\n')
    }

}

attachEvents();