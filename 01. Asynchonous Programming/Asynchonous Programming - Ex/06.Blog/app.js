function attachEvents() {

    const postUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const commentUrl = `http://localhost:3030/jsonstore/blog/comments`;

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
    const postComments = document.getElementById('post-comments');

    let postBody = '';

    async function loadPosts() {
       
        const response = await fetch(postUrl);

        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json();

        let posts = document.getElementById('posts');

        posts.innerHTML = "";
        Object.entries(data).forEach(([key, value]) => {
            let optionElement = document.createElement('option');

            optionElement.value = key;
            optionElement.textContent = value.title;
            posts.appendChild(optionElement);
            postBody = value.body;

        })

    }

    async function viewPost() {
        let postId = '';
        //всеки елемент има пропърти селекшън, ако има опция която е селектирана, постИД ще бъде конкрения селектиран пост
        document.querySelectorAll('option').forEach((o) => {
            if (o.selected) {
                postId = o.value;
            }
        });
        const postIdUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

        // в ЮРЛ-а поставяме ИД-то на селектирания пост
        const responseView = await fetch(postIdUrl);
        const dataView = await responseView.json();

        const postTitle = document.getElementById('post-title');
        postTitle.textContent = dataView.title;
        postComments.innerHTML = ''; // зачистваме коментарите
        document.getElementById('post-body').textContent = postBody;


        const commentsResponse = await fetch(commentUrl);
        const commentsData = await commentsResponse.json();

        const filteredComment = Object.values(commentsData).filter(
            x => x.postId == postId
        );


        filteredComment.forEach(comment => {

            let liElement = document.createElement('li');
            liElement.textContent = comment.text;
            postComments.appendChild(liElement);
        })

    }
}

attachEvents();