const themeLink = document.createElement('link');
themeLink.rel = 'stylesheet';
themeLink.href = 'dark-mode.css';
document.head.append(themeLink);

const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.type = 'button';
themeToggle.setAttribute('aria-label', 'Switch to dark mode');
themeToggle.setAttribute('title', 'Switch to dark mode');
themeToggle.innerHTML = '<span class="theme-icon" aria-hidden="true">☾</span><span class="theme-label">Dark</span>';
document.querySelector('.site-header')?.append(themeToggle);

const savedTheme = localStorage.getItem('solraydiance-theme');
if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';

function updateThemeButton() {
  const darkMode = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('title', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.innerHTML = `<span class="theme-icon" aria-hidden="true">${darkMode ? '☀' : '☾'}</span><span class="theme-label">${darkMode ? 'Light' : 'Dark'}</span>`;
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('solraydiance-theme', nextTheme);
  updateThemeButton();
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Keep a graceful initials treatment visible if a portrait has not been added yet.
document.querySelectorAll('.person-photo img').forEach((image) => {
  const photo = image.closest('.person-photo');
  const showImage = () => photo.classList.add('has-photo');
  const showFallback = () => photo.classList.remove('has-photo');
  image.addEventListener('load', showImage);
  image.addEventListener('error', showFallback);
  if (image.complete && image.naturalWidth > 0) showImage();
});

document.querySelectorAll('.person-photo.has-photo .person-initials').forEach((initials) => {
  initials.hidden = true;
});
document.querySelectorAll('.person-photo img').forEach((image) => {
  image.addEventListener('load', () => {
    const initials = image.closest('.person-photo').querySelector('.person-initials');
    if (initials) initials.hidden = true;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('open', !isOpen);
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}));

document.getElementById('year').textContent = new Date().getFullYear();
