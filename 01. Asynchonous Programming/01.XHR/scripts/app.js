function loadRepos() {
  let url = `https://api.github.com/users/testnakov/repos`;

  let res =  document.getElementById('res');
  let request = new XMLHttpRequest();
  request.addEventListener('readystatechange', stateHandler);

  request.open("GET", url);
  request.send();

  function stateHandler(e){
   if(request.readyState == 4  && request.status == 200){
     res.textContent = request.responseText
   }
  }
}