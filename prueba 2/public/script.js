const API_URL = '/api/products';
const leftPage = document.querySelector('#leftPage');
const rightPage = document.querySelector('#rightPage');
const flipSheet = document.querySelector('#flipSheet');
const flipFront = document.querySelector('#flipFront');
const flipBack = document.querySelector('#flipBack');
const searchInput = document.querySelector('#searchInput');
const categoryFilter = document.querySelector('#categoryFilter');
const searchForm = document.querySelector('#searchForm');
const clearSearch = document.querySelector('#clearSearch');
const searchStatus = document.querySelector('#searchStatus');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const pageLabel = document.querySelector('#pageLabel');
const progressBar = document.querySelector('#progressBar');
let products = [], filteredProducts = [], spreadIndex = 0, isTurning = false;
const perPage = 2, perSpread = 4;

const money = n => new Intl.NumberFormat('es-CO', {style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number(n)||0);
function productCard(p, number) {
  const article = document.createElement('article'); article.className = 'product-entry';
  const visual = document.createElement('div'); visual.className = 'product-visual';
  const img = document.createElement('img'); img.src = p.image_url || ''; img.alt = p.name; img.loading = 'lazy';
  img.onerror = () => { img.remove(); visual.textContent='GLOWÉ'; visual.style.display='grid'; visual.style.placeItems='center'; visual.style.color='#526f5b'; };
  visual.append(img);
  const info = document.createElement('div');
  const cat = document.createElement('p'); cat.className='product-category'; cat.textContent=`${String(number).padStart(2,'0')} / ${p.category}`;
  const name = document.createElement('h3'); name.textContent=p.name;
  const desc = document.createElement('p'); desc.className='product-description'; desc.textContent=p.description||'';
  const price = document.createElement('p'); price.className='product-price'; price.textContent=money(p.price);
  const link = document.createElement('a'); link.className='product-link'; link.textContent='VER PRODUCTO ↗'; link.href=p.product_url; link.target='_blank'; link.rel='noopener noreferrer';
  info.append(cat,name,desc,price,link); article.append(visual,info); return article;
}
function buildPage(target, items, heading, first) {
  target.replaceChildren(); const title=document.createElement('p'); title.className='page-kicker'; title.textContent=heading; target.append(title);
  if (!items.length) { const empty=document.createElement('div'); empty.className='empty-page'; empty.textContent='No encontramos productos. Prueba otra búsqueda.'; target.append(empty); }
  else { const list=document.createElement('div'); list.className='page-products'; items.forEach((p,i)=>list.append(productCard(p,first+i))); target.append(list); }
  const foot=document.createElement('div'); foot.className='page-bottom'; const a=document.createElement('span'); a.textContent='GLOWÉ SKIN JOURNAL'; const b=document.createElement('span'); b.textContent=`— ${String(first+items.length).padStart(2,'0')} —`; foot.append(a,b); target.append(foot);
}
function render() {
  const start=spreadIndex*perSpread, spread=filteredProducts.slice(start,start+perSpread);
  buildPage(leftPage,spread.slice(0,perPage),'THE DAILY RITUAL',start+1);
  buildPage(rightPage,spread.slice(perPage),'SKIN NOTES',start+perPage+1);
  const total=Math.max(1,Math.ceil(filteredProducts.length/perSpread));
  pageLabel.textContent=filteredProducts.length?`PÁGINAS ${String(start+1).padStart(2,'0')}—${String(Math.min(start+perSpread,filteredProducts.length)).padStart(2,'0')}`:'SIN RESULTADOS';
  prevButton.disabled=spreadIndex===0||isTurning; nextButton.disabled=spreadIndex>=total-1||isTurning;
  progressBar.style.width=`${filteredProducts.length?(spreadIndex+1)/total*100:0}%`;
}
function clonePageInto(target, source) { target.replaceChildren(); const clone=source.cloneNode(true); clone.removeAttribute('id'); clone.classList.add('paper'); target.append(clone); }
function turnPage(direction) {
  const total=Math.ceil(filteredProducts.length/perSpread), targetIndex=spreadIndex+direction;
  if(isTurning||targetIndex<0||targetIndex>=total)return; isTurning=true; prevButton.disabled=nextButton.disabled=true;
  const start=targetIndex*perSpread, spread=filteredProducts.slice(start,start+perSpread);
  if(direction>0){clonePageInto(flipFront,rightPage);buildPage(flipBack,spread.slice(0,perPage),'THE DAILY RITUAL',start+1);flipSheet.className='flip-sheet active turn-next';}
  else {clonePageInto(flipFront,leftPage);buildPage(flipBack,spread.slice(perPage),'SKIN NOTES',start+perPage+1);flipSheet.className='flip-sheet active turn-prev';}
  setTimeout(()=>{spreadIndex=targetIndex;flipSheet.className='flip-sheet';isTurning=false;render();},650);
}
async function loadProducts(){
  const params=new URLSearchParams(); const q=searchInput.value.trim(), category=categoryFilter.value;
  if(q)params.set('q',q); if(category!=='all')params.set('category',category);
  searchStatus.textContent='Consultando la base de datos…';
  try { const response=await fetch(`${API_URL}?${params}`); if(!response.ok)throw new Error('API no disponible'); filteredProducts=await response.json(); spreadIndex=0; clearSearch.hidden=!q&&category==='all'; searchStatus.textContent=`${filteredProducts.length} producto(s) encontrados en la base de datos.`; render(); }
  catch(err){filteredProducts=[];spreadIndex=0;render();searchStatus.textContent='No se pudo conectar. Comprueba que el servidor esté iniciado con npm start.';console.error(err);}
}
searchForm.addEventListener('submit',e=>{e.preventDefault();loadProducts();});
searchInput.addEventListener('input',loadProducts); categoryFilter.addEventListener('change',loadProducts);
clearSearch.addEventListener('click',()=>{searchInput.value='';categoryFilter.value='all';loadProducts();searchInput.focus();});
prevButton.addEventListener('click',()=>turnPage(-1)); nextButton.addEventListener('click',()=>turnPage(1));
loadProducts();
