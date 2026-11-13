const products = [
  { name: "Gel limpiador suave", category: "Limpieza", description: "Limpieza diaria sin sensación tirante.", price: 42000, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Agua micelar", category: "Limpieza", description: "Una opción práctica para retirar residuos y maquillaje.", price: 35000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Sérum de ácido hialurónico", category: "Hidratación", description: "Sérum hidratante para complementar tu rutina.", price: 68000, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Crema hidratante facial", category: "Hidratación", description: "Textura de uso diario para una piel confortable.", price: 59000, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Mascarilla facial", category: "Tratamiento", description: "Un momento extra de cuidado en tu ritual semanal.", price: 28000, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Sérum iluminador", category: "Tratamiento", description: "Un paso adicional para una rutina enfocada en luminosidad.", price: 72000, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Protector solar facial", category: "Protección solar", description: "Protección solar para incorporar a la rutina de día.", price: 64000, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Bálsamo labial", category: "Hidratación", description: "Un esencial práctico para llevar contigo.", price: 18000, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Exfoliante corporal", category: "Cuidado corporal", description: "Exfoliante corporal para un ritual de cuidado en casa.", price: 38000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Loción corporal", category: "Cuidado corporal", description: "Loción para dejar la piel con sensación suave.", price: 46000, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Rodillo facial", category: "Accesorios", description: "Accesorio para acompañar un masaje facial suave.", price: 32000, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Toalla facial suave", category: "Accesorios", description: "Un complemento para tu rutina de limpieza.", price: 22000, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Crema de manos", category: "Cuidado corporal", description: "Un cuidado sencillo para llevar en el bolso.", price: 25000, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Tónico hidratante", category: "Hidratación", description: "Un paso opcional para completar tu rutina facial.", price: 44000, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Bálsamo limpiador", category: "Limpieza", description: "Una alternativa para la primera limpieza de la noche.", price: 51000, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=85", url: "https://example.com" },
  { name: "Crema de noche", category: "Tratamiento", description: "Una crema para tu rutina nocturna, según las necesidades de tu piel.", price: 69000, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85", url: "https://example.com" }
];

const leftPage = document.querySelector("#leftPage");
const rightPage = document.querySelector("#rightPage");
const flipSheet = document.querySelector("#flipSheet");
const flipFront = document.querySelector("#flipFront");
const flipBack = document.querySelector("#flipBack");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const searchForm = document.querySelector("#searchForm");
const clearSearch = document.querySelector("#clearSearch");
const searchStatus = document.querySelector("#searchStatus");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const pageLabel = document.querySelector("#pageLabel");
const progressBar = document.querySelector("#progressBar");

let filteredProducts = [...products];
let spreadIndex = 0;
let isTurning = false;
const productsPerPage = 2;
const productsPerSpread = 4;

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(value);
}

function createProductCard(product, number) {
  const entry = document.createElement("article");
  entry.className = "product-entry";

  const visual = document.createElement("div");
  visual.className = "product-visual";
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";
  img.onerror = () => {
    img.remove();
    visual.textContent = "GLOWÉ";
    visual.style.display = "grid";
    visual.style.placeItems = "center";
    visual.style.color = "#526f5b";
    visual.style.fontFamily = "'Playfair Display', Georgia, serif";
    visual.style.letterSpacing = "3px";
  };
  visual.appendChild(img);

  const info = document.createElement("div");
  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = `${String(number).padStart(2, "0")} / ${product.category}`;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = formatCOP(product.price);

  const link = document.createElement("a");
  link.className = "product-link";
  link.textContent = "VER PRODUCTO ↗";
  link.href = product.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  info.append(category, name, description, price, link);
  entry.append(visual, info);
  return entry;
}

function buildPage(container, pageProducts, heading, firstNumber) {
  container.replaceChildren();

  const title = document.createElement("p");
  title.className = "page-kicker";
  title.textContent = heading;
  container.appendChild(title);

  if (!pageProducts.length) {
    const empty = document.createElement("div");
    empty.className = "empty-page";
    empty.textContent = "Nuevos rituales próximamente";
    container.appendChild(empty);
  } else {
    const list = document.createElement("div");
    list.className = "page-products";
    pageProducts.forEach((product, i) => {
      list.appendChild(createProductCard(product, firstNumber + i));
    });
    container.appendChild(list);
  }

  const footer = document.createElement("div");
  footer.className = "page-bottom";
  footer.innerHTML = "<span>GLOWÉ SKIN JOURNAL</span><span>— " +
    String(firstNumber + pageProducts.length).padStart(2, "0") + " —</span>";
  container.appendChild(footer);
}

function renderSpread() {
  const start = spreadIndex * productsPerSpread;
  const spread = filteredProducts.slice(start, start + productsPerSpread);
  buildPage(leftPage, spread.slice(0, productsPerPage), "THE DAILY RITUAL", start + 1);
  buildPage(rightPage, spread.slice(productsPerPage), "SKIN NOTES", start + productsPerPage + 1);

  const totalSpreads = Math.max(1, Math.ceil(filteredProducts.length / productsPerSpread));
  const first = filteredProducts.length ? start + 1 : 0;
  const last = Math.min(start + productsPerSpread, filteredProducts.length);

  pageLabel.textContent = filteredProducts.length
    ? `PÁGINAS ${String(first).padStart(2, "0")}—${String(last).padStart(2, "0")}`
    : "SIN RESULTADOS";

  prevButton.disabled = spreadIndex === 0 || isTurning;
  nextButton.disabled = spreadIndex >= totalSpreads - 1 || isTurning;
  progressBar.style.width = `${filteredProducts.length ? ((spreadIndex + 1) / totalSpreads) * 100 : 0}%`;
}

function clonePageInto(target, source) {
  target.replaceChildren();
  const clone = source.cloneNode(true);
  clone.removeAttribute("id");
  clone.classList.add("paper");
  target.appendChild(clone);
}

function turnPage(direction) {
  const totalSpreads = Math.ceil(filteredProducts.length / productsPerSpread);
  const targetIndex = spreadIndex + direction;
  if (isTurning || targetIndex < 0 || targetIndex >= totalSpreads) return;

  isTurning = true;
  prevButton.disabled = true;
  nextButton.disabled = true;

  if (direction > 0) {
    clonePageInto(flipFront, rightPage);
    const start = targetIndex * productsPerSpread;
    const spread = filteredProducts.slice(start, start + productsPerSpread);
    buildPage(flipBack, spread.slice(0, productsPerPage), "THE DAILY RITUAL", start + 1);
    flipSheet.className = "flip-sheet active turn-next";
  } else {
    clonePageInto(flipFront, leftPage);
    const start = targetIndex * productsPerSpread;
    const spread = filteredProducts.slice(start, start + productsPerSpread);
    buildPage(flipBack, spread.slice(productsPerPage), "SKIN NOTES", start + productsPerPage + 1);
    flipSheet.className = "flip-sheet active turn-prev";
  }

  window.setTimeout(() => {
    spreadIndex = targetIndex;
    flipSheet.className = "flip-sheet";
    isTurning = false;
    renderSpread();
  }, 650);
}

function applyFilters() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const category = categoryFilter.value;

  filteredProducts = products.filter(product => {
    const matchesQuery = [product.name, product.category, product.description]
      .join(" ").toLocaleLowerCase("es").includes(query);
    const matchesCategory = category === "all" || product.category === category;
    return matchesQuery && matchesCategory;
  });

  spreadIndex = 0;
  clearSearch.hidden = !query && category === "all";
  searchStatus.textContent = `${filteredProducts.length} producto(s) en la selección. Las páginas se actualizan con tu búsqueda.`;
  renderSpread();
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  applyFilters();
});
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  applyFilters();
  searchInput.focus();
});
prevButton.addEventListener("click", () => turnPage(-1));
nextButton.addEventListener("click", () => turnPage(1));

renderSpread();
