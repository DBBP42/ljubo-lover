document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.topbar');
  const primaryNav = document.querySelector('.primary-nav');
  
  // Change header background on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 20) {
      header.style.background = 'rgba(5, 8, 15, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      header.style.background = 'rgba(5, 8, 15, 0.8)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    }

    // Subtle parallax for hero
    const hero = document.querySelector('.hero');
    if (hero && scrollY < 600) {
      hero.style.transform = `translateY(${scrollY * 0.1}px)`;
      hero.style.opacity = 1 - (scrollY / 600);
    }
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 130; // topbar + primary-nav height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for reveal animations
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Apply initial styles and observe elements
  const revealElements = document.querySelectorAll('.section-card, .card, .panel-tile, .hero-card > *');
  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.05}s`;
    revealObserver.observe(el);
  });

  // Add a class to handle the revealed state
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
