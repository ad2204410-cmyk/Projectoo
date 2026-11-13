document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageIndicator = document.getElementById('page-indicator');
  const dotsContainer = document.getElementById('dots-container');

  let currentPage = 0;
  const totalPages = pages.length;

  // Crear puntos indicadores de página
  pages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Ir a la página ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToPage(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateMagazine() {
    pages.forEach((page, index) => {
      page.classList.toggle('active', index === currentPage);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });

    pageIndicator.textContent = `Página ${currentPage + 1} de ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
  }

  function goToPage(index) {
    if (index >= 0 && index < totalPages) {
      currentPage = index;
      updateMagazine();
    }
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  // Navegación con flechas del teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
  });

  updateMagazine();
});
