const url = 'http://localhost:3030/jsonstore/advanced/table';

 export async function loadStudents() {

   const response = await fetch(url);
   return response.json();

}