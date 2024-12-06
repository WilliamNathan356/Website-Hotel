document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('userToken') && sessionStorage.getItem('user')){
        const profileLink = document.getElementById('profileLink');
        const loginLink = document.getElementById('loginLink');
        profileLink.removeAttribute('hidden');
        profileLink.innerHTML = `Welcome, ${sessionStorage.getItem('user')}`;
        loginLink.setAttribute('hidden', '');
    } else {
        localStorage.clear();
    }
});

document.getElementById('searchBtn').onclick = () => {
    roomLocation = document.getElementById('roomLocationSelect').value;
    guestNums = document.getElementById('guestNumSelect').value;
    checkInDate = document.querySelector('#checkInDate input').value;
    checkOutDate = document.querySelector('#checkOutDate input').value;

    const url = '/api/findRooms';
    const formData = {
        date: checkInDate,  
        guestNum: parseInt(guestNums),
        location: roomLocation
    }   

    axios.post(url, formData)
    .then((res) => {
        console.log(res);
    })
}