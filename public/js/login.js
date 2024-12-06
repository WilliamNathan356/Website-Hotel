const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="alertBan"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

document.getElementById("closeBtn").onclick = () => {
    location.href = "index.html";
};

document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const forms = document.getElementById('loginForm');
    const userEmail = document.getElementById('userEmail').value;
    const userPass = document.getElementById('userPass').value;

    const url = '/api/login'; 
    const formData = {
        email: userEmail,
        password: userPass,
    };

    const resBtn = document.getElementById('loginBtn');
    resBtn.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span class="visually-hidden" role="status">Loading...</span>';
    resBtn.setAttribute('disabled', '')

    axios.post(url, formData)
    .then((res) => {
        if(res.data.status === 500){
            forms.reset();
            appendAlert('User not found', 'warning');
            resBtn.removeAttribute('disabled');
            resBtn.innerHTML = 'Login';
        } else {
            setTimeout(3000);
            sessionStorage.setItem("userToken", res.data.token);
            sessionStorage.setItem("user", userEmail);
            window.location.href = res.data.redirectUrl;
        }
        
    })

})
