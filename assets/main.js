const year = document.querySelectorAll('[data-year]');
year.forEach(el => el.textContent = new Date().getFullYear());

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const isProjectPage = window.location.pathname.includes('/projects/');
const prefix = isProjectPage ? '../' : '';

function ensureMainNavigation(nav) {
  if (!nav) return;
  const internalGithub = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href')?.endsWith('github.html'));
  if (!internalGithub) {
    const link = document.createElement('a');
    link.href = prefix + 'github.html';
    link.textContent = 'GitHub';
    const contact = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href')?.endsWith('contact.html'));
    if (contact) nav.insertBefore(link, contact);
    else nav.appendChild(link);
  }
}

ensureMainNavigation(document.querySelector('.nav'));
ensureMainNavigation(document.querySelector('.mobile-nav'));

const mobileExternalGithub = document.querySelector('.mobile-nav a[href*="github.com/nickvangurp"]');
if (mobileExternalGithub) {
  mobileExternalGithub.href = prefix + 'github.html';
  mobileExternalGithub.removeAttribute('target');
  mobileExternalGithub.textContent = 'GitHub';
}

const menuBtn = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}
