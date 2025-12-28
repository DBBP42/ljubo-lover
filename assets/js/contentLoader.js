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
    
    renderLanguageSelector(lang);

  } catch (error) {
    console.error('Error loading content:', error);
  }
}

const pageMapping = {
  // Home
  'index.html': { sl: 'index.html', en: 'index.html', de: 'index.html' },

  // About
  'ljuboLover.html': { sl: 'ljuboLover.html', en: 'aboutLjuboLover.html', de: 'ljuboLover.html' },
  'aboutLjuboLover.html': { sl: 'ljuboLover.html', en: 'aboutLjuboLover.html', de: 'ljuboLover.html' },

  // Trauma & Mental Health
  'mentalnoZdravje.html': { sl: 'mentalnoZdravje.html', en: 'mentalHealth.html', de: 'mentaleGesundheit.html' },
  'mentalHealth.html': { sl: 'mentalnoZdravje.html', en: 'mentalHealth.html', de: 'mentaleGesundheit.html' },
  'mentaleGesundheit.html': { sl: 'mentalnoZdravje.html', en: 'mentalHealth.html', de: 'mentaleGesundheit.html' },

  'zakajOtrociMolcijo.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },
  'whyChildrenStaySilent.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },
  'warumKinderSchweigen.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },

  'kajStoritiDanesTaTedenKasneje.html': { sl: 'kajStoritiDanesTaTedenKasneje.html', en: 'index.html', de: 'wasHeuteTun.html' },
  'wasHeuteTun.html': { sl: 'kajStoritiDanesTaTedenKasneje.html', en: 'index.html', de: 'wasHeuteTun.html' },

  'koGreZaOtroka.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },
  'whenItInvolvesAChild.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },
  'wennEsUmEinKindGeht.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },

  'zaStarseVSoku.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },
  'forParentsInShock.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },
  'fuerElternImSchock.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },

  // Addiction & Chemsex
  'travmeOdvisnostiDiskreditacije.html': { sl: 'travmeOdvisnostiDiskreditacije.html', en: 'traumaAddictionDiscredit.html', de: 'traumaSuchtDiskreditierung.html' },
  'traumaAddictionDiscredit.html': { sl: 'travmeOdvisnostiDiskreditacije.html', en: 'traumaAddictionDiscredit.html', de: 'traumaSuchtDiskreditierung.html' },
  'traumaSuchtDiskreditierung.html': { sl: 'travmeOdvisnostiDiskreditacije.html', en: 'traumaAddictionDiscredit.html', de: 'traumaSuchtDiskreditierung.html' },

  'kemseksInDiskreditacija.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },
  'chemsexAndDiscreditation.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },
  'chemsexUndDiskreditierung.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },

  'kemseksNiSoglasje.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },
  'chemsexNotSolace.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },
  'chemsexKeineEinsamkeit.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },

  'kemseksSporociloZaZrtve.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },
  'chemsexMessageForVictims.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },
  'chemsexBotschaftFuerOpfer.html': { sl: 'kemseksSporociloZaZrtve.html', en: 'chemsexMessageForVictims.html', de: 'chemsexBotschaftFuerOpfer.html' },

  // LGBT+
  'lgbtPodporaInTravma.html': { sl: 'lgbtPodporaInTravma.html', en: 'lgbtSupportAndTrauma.html', de: 'lgbtUnterstuetzungUndTrauma.html' },
  'lgbtSupportAndTrauma.html': { sl: 'lgbtPodporaInTravma.html', en: 'lgbtSupportAndTrauma.html', de: 'lgbtUnterstuetzungUndTrauma.html' },
  'lgbtUnterstuetzungUndTrauma.html': { sl: 'lgbtPodporaInTravma.html', en: 'lgbtSupportAndTrauma.html', de: 'lgbtUnterstuetzungUndTrauma.html' },

  'gejiInTravma.html': { sl: 'gejiInTravma.html', en: 'gayMenAndTrauma.html', de: 'schwuleUndTrauma.html' },
  'gayMenAndTrauma.html': { sl: 'gejiInTravma.html', en: 'gayMenAndTrauma.html', de: 'schwuleUndTrauma.html' },
  'schwuleUndTrauma.html': { sl: 'gejiInTravma.html', en: 'gayMenAndTrauma.html', de: 'schwuleUndTrauma.html' },

  'biOsebeInTravma.html': { sl: 'biOsebeInTravma.html', en: 'biPersonsAndTrauma.html', de: 'bisexuellePersonenUndTrauma.html' },
  'biPersonsAndTrauma.html': { sl: 'biOsebeInTravma.html', en: 'biPersonsAndTrauma.html', de: 'bisexuellePersonenUndTrauma.html' },
  'bisexuellePersonenUndTrauma.html': { sl: 'biOsebeInTravma.html', en: 'biPersonsAndTrauma.html', de: 'bisexuellePersonenUndTrauma.html' },

  'transOsebeInTravma.html': { sl: 'transOsebeInTravma.html', en: 'transPersonsAndTrauma.html', de: 'transPersonenUndTrauma.html' },
  'transPersonsAndTrauma.html': { sl: 'transOsebeInTravma.html', en: 'transPersonsAndTrauma.html', de: 'transPersonenUndTrauma.html' },
  'transPersonenUndTrauma.html': { sl: 'transOsebeInTravma.html', en: 'transPersonsAndTrauma.html', de: 'transPersonenUndTrauma.html' },

  'nebinarniInKvir.html': { sl: 'nebinarniInKvir.html', en: 'nonBinaryAndQueerPersons.html', de: 'nichtbinaerandqueer.html' },
  'nonBinaryAndQueerPersons.html': { sl: 'nebinarniInKvir.html', en: 'nonBinaryAndQueerPersons.html', de: 'nichtbinaerandqueer.html' },
  'nichtbinaerandqueer.html': { sl: 'nebinarniInKvir.html', en: 'nonBinaryAndQueerPersons.html', de: 'nichtbinaerandqueer.html' },

  'zaStarselgbtMladostnikov.html': { sl: 'zaStarselgbtMladostnikov.html', en: 'forParentsOfLgbtYouth.html', de: 'fuerElternVonLgbtJugendlichen.html' },
  'forParentsOfLgbtYouth.html': { sl: 'zaStarselgbtMladostnikov.html', en: 'forParentsOfLgbtYouth.html', de: 'fuerElternVonLgbtJugendlichen.html' },
  'fuerElternVonLgbtJugendlichen.html': { sl: 'zaStarselgbtMladostnikov.html', en: 'forParentsOfLgbtYouth.html', de: 'fuerElternVonLgbtJugendlichen.html' },

  // System & Rights
  'koSistemZataji.html': { sl: 'koSistemZataji.html', en: 'whenTheSystemFails.html', de: 'wennDasSystemVersagt.html' },
  'whenTheSystemFails.html': { sl: 'koSistemZataji.html', en: 'whenTheSystemFails.html', de: 'wennDasSystemVersagt.html' },
  'wennDasSystemVersagt.html': { sl: 'koSistemZataji.html', en: 'whenTheSystemFails.html', de: 'wennDasSystemVersagt.html' },

  'koPrijavaNeGreNaprej.html': { sl: 'koPrijavaNeGreNaprej.html', en: 'whenTheReportDoesntProceed.html', de: 'wennDieAnzeigeNichtWeitergeht.html' },
  'whenTheReportDoesntProceed.html': { sl: 'koPrijavaNeGreNaprej.html', en: 'whenTheReportDoesntProceed.html', de: 'wennDieAnzeigeNichtWeitergeht.html' },
  'wennDieAnzeigeNichtWeitergeht.html': { sl: 'koPrijavaNeGreNaprej.html', en: 'whenTheReportDoesntProceed.html', de: 'wennDieAnzeigeNichtWeitergeht.html' },

  'koSistemTravmatizira.html': { sl: 'koSistemTravmatizira.html', en: 'whenTheSystemTraumatizes.html', de: 'wennDasSystemTraumatisiert.html' },
  'whenTheSystemTraumatizes.html': { sl: 'koSistemTravmatizira.html', en: 'whenTheSystemTraumatizes.html', de: 'wennDasSystemTraumatisiert.html' },
  'wennDasSystemTraumatisiert.html': { sl: 'koSistemTravmatizira.html', en: 'whenTheSystemTraumatizes.html', de: 'wennDasSystemTraumatisiert.html' },

  'evropskaPot.html': { sl: 'evropskaPot.html', en: 'europeanPath.html', de: 'europaeischerWeg.html' },
  'europeanPath.html': { sl: 'evropskaPot.html', en: 'europeanPath.html', de: 'europaeischerWeg.html' },
  'europaeischerWeg.html': { sl: 'evropskaPot.html', en: 'europeanPath.html', de: 'europaeischerWeg.html' },

  'seUstavitiAliNadaljevati.html': { sl: 'seUstavitiAliNadaljevati.html', en: 'stopOrContinue.html', de: 'aufhoerenOderWeitermachen.html' },
  'stopOrContinue.html': { sl: 'seUstavitiAliNadaljevati.html', en: 'stopOrContinue.html', de: 'aufhoerenOderWeitermachen.html' },
  'aufhoerenOderWeitermachen.html': { sl: 'seUstavitiAliNadaljevati.html', en: 'stopOrContinue.html', de: 'aufhoerenOderWeitermachen.html' },

  'sodnikiPolicijaTozilstvo.html': { sl: 'sodnikiPolicijaTozilstvo.html', en: 'judgesPoliceProsecutors.html', de: 'richterPolizeiStaatsanwaelte.html' },
  'judgesPoliceProsecutors.html': { sl: 'sodnikiPolicijaTozilstvo.html', en: 'judgesPoliceProsecutors.html', de: 'richterPolizeiStaatsanwaelte.html' },
  'richterPolizeiStaatsanwaelte.html': { sl: 'sodnikiPolicijaTozilstvo.html', en: 'judgesPoliceProsecutors.html', de: 'richterPolizeiStaatsanwaelte.html' },

  // Prevention
  'prekinimoZlorabeOtrok.html': { sl: 'prekinimoZlorabeOtrok.html', en: 'stopChildAbuse.html', de: 'missbrauchVonKindernBeenden.html' },
  'stopChildAbuse.html': { sl: 'prekinimoZlorabeOtrok.html', en: 'stopChildAbuse.html', de: 'missbrauchVonKindernBeenden.html' },
  'missbrauchVonKindernBeenden.html': { sl: 'prekinimoZlorabeOtrok.html', en: 'stopChildAbuse.html', de: 'missbrauchVonKindernBeenden.html' },

  // Help & Organizations
  'pomocInOrganizacije.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'nevladneOrganizacije.html': { sl: 'nevladneOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'vladneOrganizacije.html': { sl: 'vladneOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeRegierungsorganisationen.html' },
  'slovenianNGOs.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'slowenischeNGOs.html': { sl: 'pomocInOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeNGOs.html' },
  'slowenischeRegierungsorganisationen.html': { sl: 'vladneOrganizacije.html', en: 'slovenianNGOs.html', de: 'slowenischeRegierungsorganisationen.html' },

  // Digital Safety
  'digitalnaVarnost.html': { sl: 'digitalnaVarnost.html', en: 'digitalSafety.html', de: 'digitaleSicherheit.html' },
  'digitalSafety.html': { sl: 'digitalnaVarnost.html', en: 'digitalSafety.html', de: 'digitaleSicherheit.html' },
  'digitaleSicherheit.html': { sl: 'digitalnaVarnost.html', en: 'digitalSafety.html', de: 'digitaleSicherheit.html' },

  // About
  'ljuboLover.html': { sl: 'ljuboLover.html', en: 'aboutLjuboLover.html', de: 'ljuboLover.html' },
  'aboutLjuboLover.html': { sl: 'ljuboLover.html', en: 'aboutLjuboLover.html', de: 'ljuboLover.html' },

  // Chemsex
  'kemseksInDiskreditacija.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },
  'chemsexAndDiscreditation.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },
  'chemsexUndDiskreditierung.html': { sl: 'kemseksInDiskreditacija.html', en: 'chemsexAndDiscreditation.html', de: 'chemsexUndDiskreditierung.html' },

  'kemseksNiSoglasje.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },
  'chemsexNotSolace.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },
  'chemsexKeineEinsamkeit.html': { sl: 'kemseksNiSoglasje.html', en: 'chemsexNotSolace.html', de: 'chemsexKeineEinsamkeit.html' },

  // Parents
  'zaStarseVSoku.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },
  'forParentsInShock.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },
  'fuerElternImSchock.html': { sl: 'zaStarseVSoku.html', en: 'forParentsInShock.html', de: 'fuerElternImSchock.html' },

  'koGreZaOtroka.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },
  'whenItInvolvesAChild.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },
  'wennEsUmEinKindGeht.html': { sl: 'koGreZaOtroka.html', en: 'whenItInvolvesAChild.html', de: 'wennEsUmEinKindGeht.html' },

  'zakajOtrociMolcijo.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },
  'whyChildrenStaySilent.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },
  'warumKinderSchweigen.html': { sl: 'zakajOtrociMolcijo.html', en: 'whyChildrenStaySilent.html', de: 'warumKinderSchweigen.html' },

  'kajStoritiDanesTaTedenKasneje.html': { sl: 'kajStoritiDanesTaTedenKasneje.html', en: 'index.html', de: 'wasHeuteTun.html' },
  'wasHeuteTun.html': { sl: 'kajStoritiDanesTaTedenKasneje.html', en: 'index.html', de: 'wasHeuteTun.html' }
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

  navContainer.innerHTML = html;
}

function renderLanguageSelector(lang) {
  // Check if selector exists in body
  let langContainer = document.querySelector('body > .lang-selector');
  if (!langContainer) {
    langContainer = document.createElement('div');
    langContainer.className = 'lang-selector';
    document.body.appendChild(langContainer);
  }

  const langs = ['sl', 'en', 'de'];
  const langLabels = {
    'sl': 'Izbira jezika',
    'en': 'Language selector',
    'de': 'Sprachauswahl'
  };
  
  langContainer.setAttribute('aria-label', langLabels[lang] || 'Language selector');
  
  let html = '';
  langs.forEach(l => {
    if (l === lang) return;

    let href = `../${l}/index.html`;
    
    // Try to find mapped page
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (pageMapping[currentFile] && pageMapping[currentFile][l]) {
       const targetFile = pageMapping[currentFile][l];
       href = `../${l}/${targetFile}`;
    }

    html += `<a href="${href}">${l.toUpperCase()}</a>`;
  });
  
  langContainer.innerHTML = html;
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
