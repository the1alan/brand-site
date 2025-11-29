console.log("Скрипты подключены");

// === 3D логотип с Three.js ===
function init3DLogo(){
  const canvas = document.getElementById('logo-canvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(64,64);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45,1,0.1,100);
  camera.position.z = 2.6;

  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,5,5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff,0.3));

  const geom = new THREE.BoxGeometry(1.2,1.2,0.18);
  const mat = new THREE.MeshStandardMaterial({color:0x111111, metalness:0.7, roughness:0.2});
  const box = new THREE.Mesh(geom, mat);
  scene.add(box);

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.2,1.2), new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.02}));
  plane.position.z = 0.11;
  scene.add(plane);

  function render(){ renderer.render(scene, camera); }
  render();

  // Анимации
  gsap.to(box.rotation, {y:Math.PI*2, duration:18, repeat:-1, ease:'none'});

  canvas.addEventListener('mouseenter', ()=>{
    gsap.to(box.rotation, {y:box.rotation.y + Math.PI*1.8, x:box.rotation.x + 0.9, duration:1.1, ease:'power3.out'});
    gsap.to(box.scale, {x:1.06, y:1.06, z:1.06, duration:0.6});
    gsap.ticker.add(render);
  });
  canvas.addEventListener('mouseleave', ()=>{
    gsap.to(box.rotation, {x:0,y:0,duration:1.2, ease:'elastic.out(1,0.6)'});
    gsap.to(box.scale, {x:1,y:1,z:1, duration:0.8});
    setTimeout(()=>{ gsap.ticker.remove(render); render(); }, 1200);
  });

  window.addEventListener('resize', ()=>{ renderer.setSize(64,64); render(); });
}

// === UI и GSAP анимации ===
function initUI(){
  // Анимация текста
  gsap.from('.headline', {y:40, opacity:0, duration:1.2, ease:'power3.out'});
  gsap.from('.sub', {y:20, opacity:0, duration:1, delay:0.2, ease:'power3.out'});
  gsap.from('.cta', {y:8, opacity:0, duration:1, delay:0.4});

  // Каталог товаров
  const products = [
    {id:1, title:'Black Oversized Hoodie', price:'€89', img:'https://picsum.photos/id/1011/800/1000'},
    {id:2, title:'Night Runner Jacket', price:'€129', img:'https://picsum.photos/id/1018/800/1000'},
    {id:3, title:'Minimal Tee', price:'€39', img:'https://picsum.photos/id/1025/800/1000'},
  ];
  const grid = document.getElementById('catalog-grid');
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.img}" alt="${p.title}"></div>
      <h4>${p.title}</h4>
      <div class="price">${p.price}</div>
    `;
    card.addEventListener('click', ()=> openModal(p));
    grid.appendChild(card);
  });

  // Модалка
  const modal = document.getElementById('product-modal');
  const modalContent = document.getElementById('modal-content');
  document.getElementById('close-modal').addEventListener('click', ()=> modal.classList.remove('active'));

  function openModal(p){
    modalContent.innerHTML = `
      <div style="display:flex; gap:18px; align-items:stretch;">
        <div style="flex:1; min-width:260px;"><img src="${p.img}" style="width:100%; border-radius:8px;"/></div>
        <div style="flex:1.2">
          <h2>${p.title}</h2>
          <p class="muted-small">Доступные размеры: S, M, L. Высокое качество материалов. Ограниченный тираж.</p>
          <p style="margin-top:18px; font-size:20px; font-weight:800">${p.price}</p>
          <div style="margin-top:22px;"><a class="btn primary" href="#">Купить</a></div>
        </div>
      </div>
    `;
    modal.classList.add('active');
    gsap.from('.modal .inner', {y:40, opacity:0, duration:0.5});
  }
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.remove('active'); });

  // Навигация плавная
  document.querySelectorAll('nav a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
  });
}

// === Запуск всего ===
document.addEventListener('DOMContentLoaded', ()=>{
  console.log("Скрипты подключены");
  init3DLogo();
  initUI();

  // === Гамбургер для мобильных ===
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('nav');
  menuBtn.addEventListener('click', ()=>{
    nav.classList.toggle('active');
  });
});
// Пока пусто, позже можно добавить интерактив
console.log("Brand Store loaded");
// Cards scroll animation
const cards = document.querySelectorAll('.card');

function revealCards() {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom){
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealCards);
window.addEventListener('load', revealCards);
