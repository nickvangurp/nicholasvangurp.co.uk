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

  const links = [...nav.querySelectorAll('a')];
  const hasHome = links.some(a => a.getAttribute('href')?.endsWith('index.html'));
  if (!hasHome) {
    const home = document.createElement('a');
    home.href = prefix + 'index.html';
    home.textContent = 'Home';
    nav.insertBefore(home, nav.firstChild);
  }

  const hasGithubPage = [...nav.querySelectorAll('a')].some(a => a.getAttribute('href')?.endsWith('github.html'));
  if (!hasGithubPage) {
    const github = document.createElement('a');
    github.href = prefix + 'github.html';
    github.textContent = 'GitHub';
    const contact = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href')?.endsWith('contact.html'));
    if (contact) nav.insertBefore(github, contact);
    else nav.appendChild(github);
  }

  nav.querySelectorAll('a[href*="github.com/nickvangurp"]').forEach(link => link.remove());
}

ensureMainNavigation(document.querySelector('.nav'));
ensureMainNavigation(document.querySelector('.mobile-nav'));

const menuBtn = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}
