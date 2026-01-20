// ================= STILLS + MENU + FLOWERS =================

document.addEventListener('DOMContentLoaded', () => {

  /* ========= MENU TOGGLE ========= */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  /* ========= FLOWERS SVG ========= */
  const svgs = [
    '../assets/svg/flower1.svg',
    '../assets/svg/flower2.svg',
    '../assets/svg/flower3.svg'
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

  /* ========= STILLS LIGHTBOX ========= */
  const stills = Array.from(document.querySelectorAll('.film-stills img'));
  const lightbox = document.getElementById('stills-lightbox');

  if (!stills.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');

  let currentIndex = 0;

  // OUVERTURE
  stills.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.style.display = 'flex';
    lightboxImg.src = stills[currentIndex].src;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + stills.length) % stills.length;
    lightboxImg.src = stills[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % stills.length;
    lightboxImg.src = stills[currentIndex].src;
  }

  // BOUTONS
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // FERMETURE EN DEHORS
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // CLAVIER
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
  });

});
