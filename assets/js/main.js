console.log("JS chargé");

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
    console.log("hover détecté");

    let svgText;
    try {
      const res = await fetch(svgs[Math.floor(Math.random() * svgs.length)]);
      svgText = await res.text();
    } catch (e) {
      console.error("Erreur fetch SVG", e);
      return;
    }

    const rect = link.getBoundingClientRect();
    const count = 4;

    for (let i = 0; i < count; i++) {
      const wrapper = document.createElement('div');
      wrapper.className = 'flower';
      wrapper.innerHTML = svgText;

      const offset = 10;
      wrapper.style.left =
        random(rect.left - offset, rect.right + offset) + 'px';
      wrapper.style.top =
        random(rect.top - offset, rect.bottom + offset) + window.scrollY + 'px';

      wrapper.style.setProperty('--dx', random(-30, 30) + 'px');
      wrapper.style.setProperty('--dy', random(-40, -15) + 'px');
      wrapper.style.setProperty('--scale', random(0.8, 1.4));

      document.body.appendChild(wrapper);
      setTimeout(() => wrapper.remove(), 1200);
    }
  });
});
