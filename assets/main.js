const year = document.querySelectorAll('[data-year]');
year.forEach(el => el.textContent = new Date().getFullYear());
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); },{threshold:.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const menuBtn = document.querySelector('.menu'); const mobileNav = document.querySelector('.mobile-nav');
if(menuBtn && mobileNav){ menuBtn.addEventListener('click',()=>mobileNav.classList.toggle('open')); mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open'))); }
