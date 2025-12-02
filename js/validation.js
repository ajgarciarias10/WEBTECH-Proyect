document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const registerBtn = document.getElementById('registerBtn');
    
    // Inputs
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error_message');

    if (form) {
        // Detectar envío del formulario (Enter o botón)
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            validateLogin();
        });

        // Detectar clic específico en el botón Login
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                validateLogin();
            });
        }
    }

    function validateLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Limpiar errores previos
        errorContainer.textContent = '';
        errorContainer.style.color = 'red';

        if (username === '' || password === '') {
            errorContainer.textContent = 'Please enter both username and password.';
            return;
        }

        fetch('users.json')
            .then(response => {
                if (!response.ok) throw new Error("Error reading users.json");
                return response.json();
            })
            .then(userData => {
                if (username === userData.username && password === userData.password) {
                    
                    // Crear la sesión para que index.html permita la entrada
                    sessionStorage.setItem('demoSession', 'true'); 
                    
                    // Redirigir
                    window.location.href = 'index.html';
                } else {
                    errorContainer.textContent = 'Invalid username or password.';
                }
            })
            .catch(error => {
                errorContainer.textContent = 'System Error: Unable to validate user.';
            });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Aquí iría la lógica de registro en el futuro
        });
    }
});