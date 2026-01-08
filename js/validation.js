document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const registerBtn = document.getElementById('registerBtn');
    
    // Inputs
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error_message');

    const EXTRA_USERS_KEY = 'extraUsers';

    // Leer usuarios extras de localStorage
    function getExtraUsers() {
        const raw = localStorage.getItem(EXTRA_USERS_KEY);
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (e) {
            return [];
        }
    }

    // Guardar usuarios extras en localStorage
    function saveExtraUsers(users) {
        localStorage.setItem(EXTRA_USERS_KEY, JSON.stringify(users));
    }

    if (form) {
        // Detectar envío del formulario (Enter o botón Login)
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
                let isValid = false;

                // 1) Comprobar contra el usuario del JSON
                if (username === userData.username && password === userData.password) {
                    isValid = true;
                } else {
                    // 2) Si no coincide, mirar usuarios registrados en localStorage
                    const extraUsers = getExtraUsers();
                    const found = extraUsers.find(
                        (u) => u.username === username && u.password === password
                    );
                    if (found) {
                        isValid = true;
                    }
                }

                if (isValid) {
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

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Limpiar mensaje previo
            errorContainer.textContent = '';
            errorContainer.style.color = 'red';

            // Validaciones sencillas
            if (!username || !password) {
                errorContainer.textContent = 'Please choose a username and password to register.';
                return;
            }

            if (username.length < 3) {
                errorContainer.textContent = 'Username must be at least 3 characters.';
                return;
            }

            if (password.length < 4) {
                errorContainer.textContent = 'Password must be at least 4 characters.';
                return;
            }

            const extraUsers = getExtraUsers();

            // Comprobar que no exista ya en localStorage
            const exists = extraUsers.some((u) => u.username === username);
            if (exists) {
                errorContainer.textContent = 'That username is already in use.';
                return;
            }

            // Añadir nuevo usuario a la lista
            extraUsers.push({ username, password });
            saveExtraUsers(extraUsers);

            // Mensaje de éxito
            errorContainer.style.color = 'green';
            errorContainer.textContent =
                `Account created successfully for ${username}. You can now log in.`;
        });
    }
});