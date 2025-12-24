
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});


/*----------------------PHOTOGRAPHY-----------------------------------*/

const filterButtons = document.querySelectorAll('.filter-btn');

const allPhotos = Array.from(document.querySelectorAll('.photo-item'));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let visiblePhotos = [];
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

    allPhotos.forEach(photo => {
      if (category === 'all' || photo.dataset.category === category) {
        photo.style.display = 'block';
      } else {
        photo.style.display = 'none';
      }
    });

    updateVisiblePhotos();
  });
});

/* --------- UTIL --------- */
function updateVisiblePhotos() {
  visiblePhotos = allPhotos.filter(photo => photo.style.display !== 'none');
}

/* --------- LIGHTBOX --------- */

function showLightbox(index) {
  const photo = visiblePhotos[index];
  const img = photo.querySelector('img');
  const title = photo.querySelector('.photo-title').textContent;

  lightboxImg.src = img.src;
  lightboxTitle.textContent = title;
  lightbox.style.display = 'flex';

  currentIndex = index;
}

/* --------- OUVERTURE --------- */
allPhotos.forEach(photo => {
  photo.querySelector('img').addEventListener('click', () => {
    updateVisiblePhotos();
    currentIndex = visiblePhotos.indexOf(photo);
    showLightbox(currentIndex);
  });
});

/* --------- NAVIGATION --------- */
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  showLightbox(currentIndex);
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
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

