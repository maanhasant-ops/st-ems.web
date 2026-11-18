const glow = document.getElementById('mouseGlow');
let glowX = -500, glowY = -500, targetX = -500, targetY = -500;
window.addEventListener('pointermove', (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
  if (glow) {
    glow.style.left = `${targetX}px`;
    glow.style.top = `${targetY}px`;
  }
}, { passive: true });

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('ems-theme');
if (savedTheme === 'light') document.body.classList.add('light');
function updateThemeIcon() {
  themeIcon.textContent = document.body.classList.contains('light') ? '☾' : '☼';
}
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('ems-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const search = document.getElementById('violationSearch');
const rows = document.querySelectorAll('#violationsTable tbody tr:not(.group-row)');
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  rows.forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
  document.querySelectorAll('#violationsTable .group-row').forEach(group => {
    let next = group.nextElementSibling;
    let visible = false;
    while (next && !next.classList.contains('group-row')) {
      if (!next.hidden) visible = true;
      next = next.nextElementSibling;
    }
    group.hidden = query.length > 0 && !visible;
  });
});


