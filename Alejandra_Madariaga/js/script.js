document.addEventListener("DOMContentLoaded", () => {
    // Año automático del footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Menú hamburguesa responsive
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar menú al seleccionar una sección
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    // Animación de barras de habilidades al entrar en pantalla
    const progressBars = document.querySelectorAll(".progress-bar");

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = `${bar.dataset.progress}%`;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });

    progressBars.forEach(bar => skillsObserver.observe(bar));

    // Datos de las tarjetas de proyectos
    const projectData = {
        glowe: {
            title: "Glowé — Proyecto de emprendimiento",
            description: "Propuesta de productos de cuidado corporal desarrollada con enfoque en presentación, creatividad, procesos de elaboración y una identidad de marca atractiva."
        },
        idiomas: {
            title: "Aprendizaje de idiomas",
            description: "Proyecto personal enfocado en continuar desarrollando competencias en inglés, francés y alemán mediante ejercicios, práctica y aprendizaje constante."
        },
        web: {
            title: "Portafolio interactivo",
            description: "Este sitio demuestra el uso de HTML semántico, CSS Grid/Flexbox y JavaScript para crear una experiencia responsive, interactiva y con validación de formularios."
        }
    };

    // Modal y manipulación del DOM
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalClose = document.getElementById("modalClose");

    document.querySelectorAll(".project-btn").forEach(button => {
        button.addEventListener("click", () => {
            const project = projectData[button.dataset.project];
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
            modalClose.focus();
        });
    });

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    // Validación en tiempo real del formulario
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const fields = {
        name: {
            input: document.getElementById("name"),
            error: document.getElementById("nameError"),
            validate(value) {
                if (value.trim().length < 2) return "Escribe al menos 2 caracteres.";
                return "";
            }
        },
        email: {
            input: document.getElementById("email"),
            error: document.getElementById("emailError"),
            validate(value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value.trim())) return "Introduce un correo válido.";
                return "";
            }
        },
        message: {
            input: document.getElementById("message"),
            error: document.getElementById("messageError"),
            validate(value) {
                if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
                return "";
            }
        }
    };

    function validateField(field) {
        const message = field.validate(field.input.value);
        const group = field.input.closest(".form-group");

        field.error.textContent = message;
        group.classList.toggle("invalid", Boolean(message));
        return !message;
    }

    Object.values(fields).forEach(field => {
        field.input.addEventListener("input", () => validateField(field));
        field.input.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const valid = Object.values(fields).every(validateField);

        if (!valid) {
            formStatus.textContent = "Revisa los campos marcados antes de enviar.";
            formStatus.style.color = "#b34450";
            return;
        }

        // Demo: no se envía información a un servidor.
        formStatus.textContent = "¡Mensaje validado correctamente! Este formulario está listo para conectarse a un servicio de envío.";
        formStatus.style.color = "#47785a";
        form.reset();

        Object.values(fields).forEach(field => {
            field.error.textContent = "";
            field.input.closest(".form-group").classList.remove("invalid");
        });
    });

    // Botón para volver al inicio
    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {
        backTop.classList.toggle("visible", window.scrollY > 500);
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
