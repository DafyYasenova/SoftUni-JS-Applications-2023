
export function search(){
   
    const inputFields = document.querySelector('#searchField');
    const searchFields = inputFields.value; 

    const rows = document.querySelector('.container tbody').children;
    inputFields.value = '';
  
    for(const row of rows){
       row.classList.remove('select');
        
        if(row.textContent.toLowerCase().includes(searchFields.toLowerCase())){
            row.classList.add('select')
        }
    }
}