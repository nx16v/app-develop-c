document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log('valores leidos del formulario', {email, password})
    login (email, password)
})

function login(email, password) {
    let message = '';
    let alertType = '';
    const LOGIN_ENDPOINT = 'https://reqres.in/api/login';

    fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        return response.json().then(data => {
            return {
                status: response.status,
                data: data
            };
        });
    })
    .then((result) => {
        if (result.status === 200) {
            message = 'Bienvenido!';
            alertType = 'success';
            localStorage.setItem('token', result.data.token); // ✅ Guardar token
            alertBuilder(message, alertType);
            setTimeout(() => {
                window.location.href = './admin/dashboard.html'; // ✅ Redirigir
            }, 1000);
        } else if (result.status === 400) {
            message = 'Error en la solicitud. Verifique sus credenciales.';
            alertType = 'danger';
            alertBuilder(message, alertType);
        } else {
            message = 'Error inesperado. Intente nuevamente más tarde.';
            alertType = 'danger';
            alertBuilder(message, alertType);
        }
    })
    .catch((error) => {
        alertType = 'danger';
        message = 'Error inesperado: ' + error;
        alertBuilder(message, alertType);
    });
}

function alertBuilder (message, alertType) {
    const alert = `
       <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
           ${message}
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    document.getElementById('alert').innerHTML = alert
}
