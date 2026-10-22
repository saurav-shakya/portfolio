// Live age counter (born Oct 2, 2008)
const BIRTH = new Date('2008-10-02T00:00:00+05:30').getTime();
const counter = document.getElementById('counter');
function tick() {
  const years = (Date.now() - BIRTH) / (365.2425 * 86400000);
  counter.textContent = years.toFixed(9);
  requestAnimationFrame(tick);
}
tick();

// Blur-fade reveal, staggered per section
const fades = document.querySelectorAll('.fade');
document.querySelectorAll('section').forEach(section => {
  section.querySelectorAll('.fade').forEach((el, i) => {
    el.style.setProperty('--d', `${Math.min(i, 12) * 0.04}s`);
  });
});
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fades.forEach(el => io.observe(el));

// Logo fallback: show initials when an image fails to load
document.querySelectorAll('.logo img').forEach(img => {
  img.addEventListener('error', () => {
    img.parentElement.textContent = img.dataset.initials || img.alt.charAt(0);
  });
});

// Theme toggle (dark by default)
document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// Dock magnification (desktop pointers only)
const dock = document.querySelector('.dock');
const items = [...dock.querySelectorAll('.dock-item')];
const BASE = 40, MAX = 60, RANGE = 140;
if (window.matchMedia('(hover: hover) and (min-width: 641px)').matches) {
  dock.addEventListener('mousemove', e => {
    items.forEach(item => {
      const r = item.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (r.left + r.width / 2));
      const size = dist < RANGE ? BASE + (MAX - BASE) * (1 - dist / RANGE) : BASE;
      item.style.width = item.style.height = `${size}px`;
    });
  });
  dock.addEventListener('mouseleave', () => {
    items.forEach(item => { item.style.width = item.style.height = ''; });
  });
}
