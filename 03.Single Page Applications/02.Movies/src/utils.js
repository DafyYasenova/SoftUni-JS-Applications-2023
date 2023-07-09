
export function showView(section) {

    document.querySelectorAll('.view-section').forEach(section => section.style.display = 'none');
    section.style.display = 'inline-block';

}


export function updateNavBar() {
   // welcomeMsg = document.querySelector('body .nav-link #welcome-msg');

    const user = JSON.parse(sessionStorage.getItem('user'));
  
    if (user) {
        document.querySelectorAll('.user').forEach(element => element.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(element => element.style.display = 'none');
       // welcomeMsg.textContent = `Welcome, ${user.email}`;
    } else {
    
        // скриваме всички, елементи свързани с потребителя и ги скриваме
        document.querySelectorAll('.user').forEach(element => element.style.display = 'none');
        document.querySelectorAll('.guest').forEach(element => element.style.display = 'inline-block');
    
    //welcomeMsg.textContent = '';
}
}