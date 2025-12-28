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

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        secondaryNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !secondaryNav.contains(e.target)) {
        if (navToggle.getAttribute('aria-expanded') === 'true') {
          navToggle.setAttribute('aria-expanded', 'false');
          secondaryNav.classList.remove('open');
          navToggle.classList.remove('open');
        }
      }
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

  // Dynamic Topbar Height for Sticky Nav
  function updateTopbarHeight() {
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      // Use getBoundingClientRect for sub-pixel precision
      const rect = topbar.getBoundingClientRect();
      // We use Math.ceil to ensure the sticky 'top' value is at least the full pixel height of the topbar.
      // This prevents the primary-nav from sliding under the topbar due to sub-pixel rendering differences.
      const height = Math.ceil(rect.height); 
      document.documentElement.style.setProperty('--topbar-height', `${height}px`);
    }
  }

  // Run on load and resize
  updateTopbarHeight();
  window.addEventListener('resize', () => {
    // Use requestAnimationFrame for smoother updates during resize
    requestAnimationFrame(updateTopbarHeight);
  });
  
  // Also run after a short delay to ensure fonts/layout are settled
  setTimeout(updateTopbarHeight, 100);
  setTimeout(updateTopbarHeight, 500); // Extra check for late loading fonts
});
