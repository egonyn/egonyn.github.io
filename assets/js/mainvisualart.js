

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});


/*----------------------PHOTOGRAPHY-----------------------------------*/

const filterButtons = document.querySelectorAll('.filter-btn');

const allVisualArt = Array.from(document.querySelectorAll('.visualart-item'));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let visibleVisualArt = [];
let currentIndex = 0;

const svgs = [
  'assets/svg/flower1.svg',
  'assets/svg/flower2.svg',
  'assets/svg/flower3.svg'
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

document.querySelectorAll('.flower-link').forEach(link => {
  link.addEventListener('mouseenter', async () => {
    const res = await fetch(
      svgs[Math.floor(Math.random() * svgs.length)]
    );
    const svgText = await res.text();

    for (let i = 0; i < 3; i++) {
      const flower = document.createElement('span');
      flower.className = 'flower';
      flower.innerHTML = svgText;

      flower.style.setProperty('--dx', random(-20, 20) + 'px');
      flower.style.setProperty('--dy', random(-25, -10) + 'px');
      flower.style.setProperty('--scale', random(0.7, 1.2));

      link.appendChild(flower);

      setTimeout(() => flower.remove(), 1000);
    }
  });
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    allVisualArt.forEach(visualart => {
      if (category === 'all' || visualart.dataset.category === category) {
        visualart.style.display = 'block';
      } else {
        visualart.style.display = 'none';
      }
    });

    updateVisibleVisualArt();
  });
});

/* --------- UTIL --------- */
function updateVisibleVisualArt() {
  visibleVisualArt = allVisualArt.filter(visualart => visualart.style.display !== 'none');
}

/* --------- LIGHTBOX --------- */

function showLightbox(index) {
  const visualart = visibleVisualArt[index];
  const img = visualart.querySelector('img');
  const title = visualart.querySelector('.visualart-title').textContent;

  lightboxImg.src = img.src;
  lightboxTitle.textContent = title;
  lightbox.style.display = 'flex';

  currentIndex = index;
}

/* --------- OUVERTURE --------- */
allVisualArt.forEach(visualart => {
  visualart.querySelector('img').addEventListener('click', () => {
    updateVisibleVisualArt();
    currentIndex = visibleVisualArt.indexOf(visualart);
    showLightbox(currentIndex);
  });
});

/* --------- NAVIGATION --------- */
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleVisualArt.length) % visibleVisualArt.length;
  showLightbox(currentIndex);
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleVisualArt.length;
  showLightbox(currentIndex);
});

/* --------- FERMETURE --------- */
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

/* --------- CLAVIER --------- */
document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') lightbox.style.display = 'none';
  }
});

