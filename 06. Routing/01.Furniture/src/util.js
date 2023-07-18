export function getUserData(){
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(){
 sessionStorage.setItem('usetData', JSON.stringify(data));
}

export function getUserData(){
    sessionStorage.removeItem('userData');
}