document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');
    const toggleLoginBtn = document.getElementById('toggleLoginBtn');
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');

    // --- Manejo de la visibilidad del formulario de login ---
    // Función para actualizar el estado del botón y visibilidad del formulario
    function updateLoginUI() {
        const token = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('currentUser');

        if (token && username) {
            toggleLoginBtn.textContent = `Bienvenido, ${username} (Salir)`;
            loginContainer.classList.remove('visible'); // Asegura que el formulario esté oculto si ya hay sesión
            loginMessage.textContent = ''; // Limpia mensajes anteriores
        } else {
            toggleLoginBtn.textContent = 'Iniciar Sesión / Acceso Admin';
            // loginContainer.classList.remove('visible'); // Oculta por defecto si no está logeado
            loginMessage.textContent = ''; // Limpia mensajes anteriores
        }
        loginForm.reset(); // Limpia los campos del formulario cada vez que se actualiza la UI
    }

    // Al cargar la página, verifica si ya hay sesión y actualiza la UI
    updateLoginUI();

    // Event listener para el botón de mostrar/ocultar/cerrar sesión
    toggleLoginBtn.addEventListener('click', function() {
        if (localStorage.getItem('jwtToken')) { // Si hay un token, es un clic para cerrar sesión
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('currentUser');
            // localStorage.removeItem('userRoles'); // Si manejas roles
            console.log('Sesión cerrada.');
            loginMessage.textContent = 'Has cerrado sesión.';
            loginMessage.className = 'login-message success';
            updateLoginUI(); // Actualiza el estado visual
        } else { // Si no hay token, es un clic para mostrar/ocultar el formulario
            loginContainer.classList.toggle('visible');
            if (loginContainer.classList.contains('visible')) {
                loginUsernameInput.focus();
            }
            loginMessage.textContent = ''; // Limpia el mensaje al mostrar/ocultar
            loginMessage.className = 'login-message';
        }
    });

    // --- Manejo del envío del formulario de login ---
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json(); // Esperamos una respuesta JSON

            if (response.ok) { // Si la respuesta HTTP es 2xx (ej. 200 OK)
                loginMessage.textContent = '¡Inicio de sesión exitoso! Bienvenido, ' + result.username + '.';
                loginMessage.className = 'login-message success';

                // --- ¡IMPORTANTE! Guardar el Token JWT ---
                localStorage.setItem('jwtToken', result.accessToken);
                localStorage.setItem('currentUser', result.username);
                // Si tu JwtResponse incluye el ID y email, puedes guardarlos también:
                // localStorage.setItem('currentUserId', result.id);
                // localStorage.setItem('currentUserEmail', result.email);
                // localStorage.setItem('userRoles', JSON.stringify(result.roles)); // Si usas roles

                console.log('Token JWT guardado:', result.accessToken);

                updateLoginUI(); // Actualiza la UI para reflejar el login
                // Puedes redirigir aquí si lo deseas:
                // window.location.href = '/dashboard.html';

            } else { // Si la respuesta HTTP es un error (4xx, 5xx)
                if (response.status === 401) {
                    loginMessage.textContent = 'Credenciales incorrectas. Intenta de nuevo.';
                } else {
                    loginMessage.textContent = result.message || 'Error al iniciar sesión.';
                }
                loginMessage.className = 'login-message error';
            }
        } catch (error) {
            loginMessage.textContent = 'Error de conexión. Intenta más tarde.';
            loginMessage.className = 'login-message error';
            console.error('Error al iniciar sesión:', error);
        }
    });
});