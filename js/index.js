// 1. LÓGICA DE SEGURIDAD (Se ejecuta inmediatamente)
// Comprobamos si existe la sesión antes de cargar nada más
const SESSION_KEY = 'demoSession';

if (!sessionStorage.getItem(SESSION_KEY)) {
    // Si no hay sesión, mandamos al usuario de vuelta al login
    window.location.replace('account.html');
}

// 2. LÓGICA DE LA INTERFAZ (Se ejecuta cuando carga el HTML)
document.addEventListener('DOMContentLoaded', () => {

    // --- A. GESTIÓN DEL BOTÓN LOGOUT ---
    const loginLink = document.querySelector('.header__nav a[href="account.html"]');
    
    // Solo modificamos el botón si existe y tenemos sesión (doble seguridad)
    if (loginLink && sessionStorage.getItem(SESSION_KEY)) {
        loginLink.textContent = 'LOG OUT';
        
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Borramos la sesión
            sessionStorage.removeItem(SESSION_KEY);
            // Redirigimos al login
            window.location.href = 'account.html';
        });
    }

    // --- B. GESTIÓN DE PESTAÑAS (TABS) ---
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    if (tabs.length) {
        const show = (name) => {
            // Ocultar todos los paneles
            panels.forEach((panel) => {
                panel.style.display = 'none';
            });

            // Quitar clase activa de todas las pestañas
            tabs.forEach((tab) => {
                tab.classList.remove('is-active');
            });

            // Activar la seleccionada
            const activeTab = document.querySelector(`.tab[data-tab="${name}"]`);
            const activePanel = document.querySelector(`.tab-panel[data-panel="${name}"]`);

            if (activeTab) {
                activeTab.classList.add('is-active');
            }

            if (activePanel) {
                activePanel.style.display = 'block';
            }

            // Si es la pestaña de fecha, inicializar calendario
            if (name === 'date' && !window.calendarInitialized) {
                initCalendar();
                window.calendarInitialized = true;
            }
        };

        // Eventos Hover
        tabs.forEach((tab) => {
            tab.addEventListener('mouseover', () => {
                show(tab.dataset.tab);
            });
        });

        // Mostrar la primera pestaña por defecto
        show(tabs[0].dataset.tab);
    }

    // --- C. FUNCIÓN DEL CALENDARIO ---
    function initCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2026-01-01',
            locale: 'en',
            firstDay: 1,
            headerToolbar: {
                left: '',
                center: 'title',
                right: ''
            },
            events: [
                {
                    title: 'Important Event',
                    start: '2026-01-09',
                    allDay: true,
                    backgroundColor: '#4a90e2',
                    borderColor: '#4a90e2'
                }
            ],
            selectable: false,
            editable: false,
            selectMirror: false,
            dayMaxEvents: true,
            navLinks: false,
            dateClick: () => false
        });

        calendar.render();
    }
});