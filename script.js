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
