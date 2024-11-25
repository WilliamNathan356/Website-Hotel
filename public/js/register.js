document.getElementById("closeBtn").onclick = () => {
    location.href = "index.html";
};

document.getElementById('registerBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const forms = document.getElementById('registerForm');
    const userEmail = document.getElementById('userEmail').value;
    const userFName = document.getElementById('userFName').value;
    const userLName = document.getElementById('userLName').value;
    const userPass = document.getElementById('userPass').value;
    const userConfPass = document.getElementById('userConfPass').value;

    // Validate passwords
    if (!userPass || userPass !== userConfPass) {
        alert('Passwords do not match. Please try again.');
    }

    const url = '/api/register';
    const formData = {
        email: userEmail,
        password: userPass,
        firstName: userFName,
        lastName: userLName,
    };

    const resBtn = document.getElementById('registerBtn');
    resBtn.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span class="visually-hidden" role="status">Loading...</span>';
    resBtn.setAttribute('disabled', '')

    axios.post(url, formData)
    .then((res) => {
        setTimeout(3000);
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("user", userEmail);
    })
    .then((data) => {
        forms.reset();
        window.location.href = data.redirectTo;
    })
});

