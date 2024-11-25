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
        forms.reset();
        window.location.href = res.data.redirectTo;
    });
})
    
    // console.log('Response Data:', response);
    // if (response.data.redirectTo) {
    //     window.location.href = response.data.redirectTo;
    // } else {
    //     alert('Registration successful, but no redirect URL provided.');
    // }

// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//     'use strict'

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation')
//     const userPass = document.getElementById('userPass').value;
//     const userConfPass = document.getElementById('userConfPass').value;

//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//         form.addEventListener('submit', event => {
//             if (!form.checkValidity() ) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }

//             form.classList.add('was-validated');
//         }, false)
//     })
//     setTimeout(100);
// })();

