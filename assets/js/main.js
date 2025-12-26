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

  // Touch support for cards
  const cards = document.querySelectorAll('.card, .path-card');
  
  cards.forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.classList.remove('touch-active');
      }, 150);
    });
    
    card.addEventListener('touchcancel', () => {
      card.classList.remove('touch-active');
    });
  });
});
