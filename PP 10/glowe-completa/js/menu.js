document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Abrir o cerrar menú al tocar el botón hamburguesa
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('activo');
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('activo');
        });
    });
});
