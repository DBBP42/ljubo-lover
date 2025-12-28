/**
 * Loads navigation and footer content from JSON files based on the current language.
 */
async function loadContent() {
  const lang = document.documentElement.lang || 'sl';
  
  try {
    const [navData, footerData] = await Promise.all([
      fetch('../content/navigation.json').then(r => r.json()),
      fetch('../content/footer.json').then(r => r.json())
    ]);

    const nav = navData[lang];
    const footer = footerData[lang];

    if (nav) renderNavigation(nav, lang);
    if (footer) renderFooter(footer, lang);

  } catch (error) {
    console.error('Error loading content:', error);
  }
}

const pageMapping = {
  'index.html': { sl: 'index.html', en: 'index.html', de: 'index.html' },
  'kemseksSporociloZaZrtve.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },
  'chemsexMessageForVictims.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },
  'chemsexBotschaftFuerOpfer.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },
  'pomocInOrganizacije.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'slovenianNGOs.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'slowenischeNGOs.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' }
};

function renderNavigation(data, lang) {
  const navContainer = document.querySelector('.secondary-nav');
  if (!navContainer) return;

  let html = '';
  
  // Main links
  data.topbar.forEach(item => {
    // Check if active
    // We compare the end of the pathname with the item url
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = currentPath === item.url;
    const activeClass = isActive ? 'class="active"' : '';
    const ariaCurrent = isActive ? 'aria-current="page"' : '';
    html += `<a href="${item.url}" ${activeClass} ${ariaCurrent}>${item.label}</a>`;
  });

  // CTA
  if (data.cta) {
    html += `<a href="${data.cta.url}" class="cta-button">${data.cta.label}</a>`;
  }

  // Language Selector
  const langs = ['sl', 'en', 'de'];
  const langLabels = {
    'sl': 'Izbira jezika',
    'en': 'Language selector',
    'de': 'Sprachauswahl'
  };
  
  html += `<div class="lang-selector" aria-label="${langLabels[lang] || 'Language selector'}">`;
  
  langs.forEach(l => {
    const isCurrent = l === lang;
    let href = isCurrent ? './index.html' : `../${l}/index.html`;
    
    // Try to find mapped page
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (pageMapping[currentFile] && pageMapping[currentFile][l]) {
       const targetFile = pageMapping[currentFile][l];
       if (isCurrent) {
         href = targetFile;
       } else {
         href = `../${l}/${targetFile}`;
       }
    }

    const activeAttr = isCurrent ? 'aria-current="page"' : '';
    html += `<a href="${href}" ${activeAttr}>${l.toUpperCase()}</a>`;
  });
  
  html += `</div>`;

  navContainer.innerHTML = html;
}

function renderFooter(data, lang) {
  const footerContainer = document.querySelector('.footer-content');
  if (!footerContainer) return;

  let linksHtml = data.links.map(link => `<a href="${link.url}">${link.label}</a>`).join('\n');

  // Handle brand text with fade effect if it contains .com
  let brandHtml = data.brandText;
  if (brandHtml.includes('.com')) {
    brandHtml = brandHtml.replace('.com', '<span class="brand-fade">.com</span>');
  }

  const html = `
    <div class="brand">
      <span class="brand-dot"></span>
      ${brandHtml}
    </div>
    <p>${data.description}</p>
    <div class="footer-links">
      ${linksHtml}
    </div>
    <div class="copyright">
      ${data.copyright}
    </div>
  `;

  footerContainer.innerHTML = html;
}

// Run on load
document.addEventListener('DOMContentLoaded', loadContent);
