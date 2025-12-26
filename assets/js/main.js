document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const secondaryNav = document.querySelector('.secondary-nav');

  if (navToggle && secondaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      secondaryNav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }
});
