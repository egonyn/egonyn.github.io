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

const filterButtons = document.querySelectorAll('.filter-btn');
const photos = document.querySelectorAll('.photo-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    photos.forEach(photo => {
      if (category === 'all' || photo.dataset.category === category) {
        photo.style.opacity = 0;
        photo.style.display = 'block';
        setTimeout(() => {
          photo.style.opacity = 1;
        }, 10); // petit délai pour la transition
      } else {
        photo.style.opacity = 0;
        setTimeout(() => {
          photo.style.display = 'none';
        }, 500); // correspond à la durée de transition
      }
    });
  });
});

