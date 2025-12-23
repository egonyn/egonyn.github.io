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

    const count = 3;

    for (let i = 0; i < count; i++) {
      const flower = document.createElement('span');
      flower.className = 'flower';
      flower.innerHTML = svgText;

      flower.style.setProperty('--dx', random(-20, 20) + 'px');
      flower.style.setProperty('--dy', random(-30, -10) + 'px');
      flower.style.setProperty('--scale', random(0.8, 1.3));

      link.appendChild(flower);

      setTimeout(() => flower.remove(), 1000);
    }
  });
});
