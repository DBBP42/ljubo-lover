# Ljubo-Lover – Breaking Silence, Building Resilience

A trauma-informed, multilingual static website dedicated to sexual violence awareness, survivor support, and systemic accountability. **Ljubo-Lover** centers voices often marginalized in abuse prevention discourse: men, LGBTQ+ individuals, and other communities disproportionately affected by sexual violence.

---

## 🎯 Mission

To provide evidence-based, accessible information that:
- **Normalizes survivor experiences** without judgment
- **Explains trauma responses** in plainspoken, scientific language
- **Decentralizes victim blame** and refocuses accountability on perpetrators
- **Bridges gaps** in institutional support (legal, medical, psychological)
- **Empowers recovery** through knowledge and community resources

---

## 📋 Content Overview

The site covers 25+ critical topics organized across three languages:

### Core Topics

#### Sexual Violence & Exploitation
- **kemseks_*** – Chemsex: Recognition, harm reduction, recovery
- **ko_gre_za_otroka.json** – Child sexual abuse: Prevention, reporting, support
- **kemseks_sporocilo_za_zrtve.json** – Direct messaging to survivors of drug-facilitated abuse

#### Trauma & System Response
- **ko_sistem_*.json** – Where systems fail: Institutional gaslighting, retraumatization
- **travme_odvisnosti_diskreditacije.json** – Trauma, addiction, credibility attacks (intersectional)
- **mentalno_zdravje.json** – Mental health impacts (PTSD, dissociation, shame, recovery)

#### Identity & Support
- **lgbt_podpora_in_travma.json** – LGBTQ+-specific trauma and support
- **nebinarni_in_kvir.json** – Non-binary and queer experiences
- **transOsebeInTravma.html** – Trans-specific trauma and resilience
- **gejiInTravma.html** – Gay men's experiences

#### Child Protection & Family Support
- **zakaj_otroci_molcijo.json** – Why children stay silent (developmental psychology)
- **zaStarsevSOku.json** – Resources for parents in shock
- **zaStarselgbtMladostnikov.json** – Resources for parents of LGBTQ+ youth

#### Legal & Institutional Resources
- **sodnikiPolicijaTozilstvo.json** – Court system, police, prosecutors (Slovenian)
- **sloVladneOrganizacije.json** – Slovenian government support resources
- **sloNevladneOrganizacije.json** – Slovenian NGO support networks

#### Specialized Topics
- **evropskaPot.json** – European legislative context
- **digitalnaVarnost.json** – Digital safety and online harassment
- **kaj_storiti_danes_ta_teden_kasneje.json** – Actionable steps: Immediate, weekly, long-term
- **se_ustaviti_ali_nadaljevati.json** – Decision-making about reporting & prosecution

---

## 🏗️ Technical Architecture

### Design Philosophy: Zero-Complexity
- **No JavaScript** – Pure HTML/CSS for accessibility, offline use, minimal maintenance
- **No build process** – Files served as-is; no compilation or bundling
- **No dependencies** – Complete independence from package managers
- **Static delivery** – Works on any web server or CDN

### Stack
- **HTML5** – Semantic markup with ARIA labels
- **CSS3** – Custom properties (variables), dark theme, responsive design
- **JSON** – Content structure (not rendered dynamically)

### Browser Support
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive (iOS, Android)
- Accessible: WCAG 2.1 AA standards, semantic HTML

---

## 📁 Project Structure

```
ljuboLoverwww/
├── README.md                          # This file
├── AGENT.MD                           # Agent development guidelines
├── .github/
│   ├── copilot-instructions.md        # Copilot/Claude instructions
│   └── ...
├── .git/                              # Git repository
├── main.css                           # Shared CSS (all languages)
│
├── index.html                         # Slovenian homepage
├── *.html                             # 25 Slovenian content pages
├── content/
│   ├── *.json                         # 25 JSON content definitions
│   ├── mentalno_zdravje.json          # Mental health (merged, sequential)
│   ├── lgbt_micro_pages.json          # LGBTQ+ page definitions
│   └── ...
│
├── de/                                # German version
│   ├── index.html
│   └── *.html                         # German translations
│
├── en/                                # English version
│   ├── index.html
│   └── *.html                         # English translations
│
├── themes/                            # [Reserved for future theme extensions]
├── translations/                      # [Reserved for i18n tooling]
│
├── index-test-upgrade.html            # [Legacy: Test version, safe to ignore]
├── min-test-upgrade.css               # [Legacy: Test CSS, safe to ignore]
└── llms-full.txt                      # [Unrelated: Morph API documentation]
```

---

## 🌍 Localization Strategy

### Supported Languages
1. **Slovenian (sl)** – Root folder (`/`) – Primary language
2. **English (en)** – `/en/` – Full translation
3. **German (de)** – `/de/` – Full translation

### Language Parity
Each page exists in all three languages with equivalent content. Language switching uses simple HTML `<a>` links (no JavaScript).

**Hreflang tags** ensure search engines understand language variants:
```html
<link rel="alternate" hreflang="sl" href="https://ljubolover.si/" />
<link rel="alternate" hreflang="en" href="https://ljubolover.si/en/" />
<link rel="alternate" hreflang="de" href="https://ljubolover.si/de/" />
```

### Adding New Languages
1. Duplicate language folder (e.g., `/de/` → `/fr/`)
2. Translate all `.html` files and `/content/*.json` files
3. Update hreflang tags across all pages
4. Test at `/fr/index.html`

---

## 🚀 Getting Started

### Local Development

#### Option 1: Python Built-in Server
```bash
cd /home/diablo/Projects/ljuboLoverwww
python3 -m http.server 8000
# Visit: http://localhost:8000
```

#### Option 2: Node.js HTTP Server
```bash
npx http-server
# Visit: http://localhost:8080
```

#### Option 3: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click on `index.html` → "Open with Live Server"
3. Auto-refreshes on file changes

### File Structure Navigation
- **Content editing**: Edit `/content/*.json` files
- **Page structure**: Edit `/index.html` and language-specific pages
- **Styling**: Edit `main.css` (shared across all languages)
- **Page translations**: Edit `/en/*.html`, `/de/*.html`

---

## ✏️ Adding & Editing Content

### Adding a New Topic

#### 1. Create JSON Content
Add to `/content/my-new-topic.json`:
```json
{
  "id": "my-new-topic",
  "title": "Topic Title",
  "sections": [
    {
      "id": "section-1",
      "title": "Section Title",
      "content": "..."
    }
  ]
}
```

#### 2. Create HTML Pages
Create `/my-new-topic.html` (Slovenian), `/en/my-new-topic.html`, `/de/my-new-topic.html`

Each page should include:
```html
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Topic Title</title>
  <link rel="stylesheet" href="main.css">
  <link rel="alternate" hreflang="sl" href="https://ljubolover.si/my-new-topic.html" />
  <link rel="alternate" hreflang="en" href="https://ljubolover.si/en/my-new-topic.html" />
  <link rel="alternate" hreflang="de" href="https://ljubolover.si/de/my-new-topic.html" />
</head>
<body>
  <!-- Content -->
</body>
</html>
```

#### 3. Update Navigation
Add link to `/index.html` navigation and all language equivalents

#### 4. Commit
```bash
git add content/my-new-topic.json *.html en/*.html de/*.html
git commit -m "Add: my-new-topic with translations"
```

### Editing Existing Content
1. Locate JSON file in `/content/`
2. Update content while preserving structure
3. Translate changes to `en/` and `de/` versions
4. Test across all three languages locally

---

## 🎨 Design & Styling

### CSS Variables
Edit `main.css` to customize colors:

```css
:root {
  --bg: #05080f;              /* Dark background */
  --accent: #ff6b2b;          /* Orange primary */
  --accent-2: #4ade80;        /* Green secondary */
  --text: #f8fafc;            /* Light text */
  --muted: #94a3b8;           /* Gray muted text */
}
```

### Responsive Design
- **Mobile-first** approach
- Breakpoints: `768px`, `1024px`
- Uses CSS Grid and Flexbox
- Tested on iPhone, Android, tablets, desktops

### Typography
- **Headings**: Space Grotesk (geometric sans-serif)
- **Body**: Work Sans (humanist sans-serif)
- **System fallbacks**: -apple-system, system-ui

### Component Classes
- `.card` / `.section-card` – Content containers with hover effects
- `.btn.primary` / `.btn.ghost` – CTA buttons
- `.note` – Highlighted callout boxes
- `.timeline-item` – Sequential step layouts
- `.grid` – Auto-responsive grid layout

---

## ♿ Accessibility & Standards

### WCAG 2.1 AA Compliance
- ✅ Semantic HTML (`<h1>`, `<section>`, `<article>`, `<nav>`)
- ✅ ARIA labels on interactive elements
- ✅ Color contrast ratios ≥ 4.5:1 (text), 3:1 (UI)
- ✅ Keyboard navigation (no mouse-required interactions)
- ✅ Screen reader friendly structure

### Best Practices
- All images have `alt` attributes
- Form labels properly associated with inputs
- Focus states visible on all interactive elements
- Language attribute on `<html>` tag
- Proper heading hierarchy (no skipped levels)

### Testing
```bash
# Check with Axe DevTools (Chrome/Firefox extension)
# Check with WAVE (browser extension)
# Test keyboard navigation: Tab → Enter
# Test with screen reader: NVDA (Windows), VoiceOver (Mac)
```

---

## 🚀 Deployment

### Static Hosting Options

#### Option 1: GitHub Pages (Free)
```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ljuboLover.git
git push origin main

# Enable Pages: Settings → Pages → Deploy from branch → main → Save
# Site available at: https://YOUR_USERNAME.github.io/ljuboLover/
```

#### Option 2: Netlify (Free tier)
1. Connect GitHub repository
2. Build command: (leave empty – no build needed)
3. Publish directory: `/`
4. Deploy

#### Option 3: Vercel (Free tier)
1. Import project from GitHub
2. Framework: Other (static)
3. Deploy

#### Option 4: Traditional Web Server
```bash
# SCP to server
scp -r . user@server:/var/www/html/ljubolover/

# Nginx config
server {
    listen 80;
    server_name ljubolover.si;
    root /var/www/html/ljubolover;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### CDN Recommendations
- **Cloudflare** – Free plan, global distribution, DDoS protection
- **Bunny CDN** – Affordable, excellent for European traffic
- **AWS CloudFront** – Enterprise-grade, high volume support

### HTTPS / SSL
- **GitHub Pages**: Automatic (*.github.io)
- **Netlify**: Automatic
- **Vercel**: Automatic
- **Self-hosted**: Use Let's Encrypt (`certbot`) or similar

---

## 🤝 Contributing

### Contribution Guidelines

#### Code of Conduct
- Respect survivor experiences without judgment
- Center marginalized voices in discussion design
- Avoid victim-blaming language and framing
- Prioritize accessibility and trauma-informed design

#### Reporting Issues
1. Check [GitHub Issues](https://github.com/ljubolover/issues) for duplicates
2. Describe issue clearly:
   - What page/content is affected?
   - What's the expected vs. actual behavior?
   - Screenshots or error messages?

#### Submitting Translations
1. Fork the repository
2. Translate content files (`.json`) and HTML pages
3. Ensure language parity (all 25 pages translated)
4. Test locally at `http://localhost:8000/NEW_LANG/`
5. Submit pull request with language code (e.g., `feat: Add French (fr) translation`)

#### Adding Resources
1. Update relevant `/content/*.json` file
2. Add link in corresponding HTML page
3. Update all language versions
4. Link to **verified, reputable sources** only
5. Include resource description and language availability

#### Bug Fixes & Improvements
1. Create branch: `git checkout -b fix/issue-description`
2. Make changes with clear commit messages
3. Test across browsers and devices
4. Submit pull request

---

## 📊 Content Quality Standards

### Writing Principles
- **Trauma-informed**: Validate without judgment; explain neurobiological responses
- **Accessible**: Plain language; explain jargon; use short sentences
- **Accurate**: Cite peer-reviewed research; distinguish opinion from fact
- **Respectful**: Use appropriate terminology; center survivor agency

### Content Review Checklist
- [ ] Fact-checked against peer-reviewed sources
- [ ] Reviewed by trauma-informed professional (if medical/psychological)
- [ ] Tested for accessibility (readability, contrast, navigation)
- [ ] Translated accurately to all language versions
- [ ] Links tested and validated (not 404)
- [ ] Trauma-informed framing verified
- [ ] Inclusive language (no victim-blaming, slurs, or exclusionary terms)

---

## 🔧 Maintenance & Known Issues

### Project Health
- ✅ Zero JavaScript – Low maintenance, high security
- ✅ Semantic HTML – Future-proof, accessible
- ✅ CSS-only styling – Works everywhere
- ⚠️ Manual translation – Requires discipline to keep languages in sync
- ⚠️ No automated testing – Content accuracy relies on manual review

### Legacy Files (Safe to Ignore)
- `index-test-upgrade.html` – Old test version (unused)
- `min-test-upgrade.css` – Old CSS test (unused)
- `llms-full.txt` – Unrelated Morph API documentation

### Reserved Directories
- `themes/` – For future theme system
- `translations/` – For future i18n tooling

### Recommended Future Improvements
1. **Automated i18n** – Tool to sync JSON structure across languages
2. **Build pipeline** – CSS/HTML minification (optional; not critical)
3. **Automated testing** – Link checking, accessibility audit, content validation
4. **Search functionality** – Client-side search with JSON content
5. **Analytics** – Privacy-respecting visitor metrics (Plausible, Fathom)

---

## 📞 Support & Resources

### For Survivors
- [Ljubo-Lover](https://ljubolover.si) – This website
- Slovenian hotlines listed in `/content/slo_vladne_organizacije.json`
- European resources in `/content/evropska_pot.json`

### For Developers
- **Questions?** Open a GitHub issue
- **Pull requests?** Welcome – see Contributing section
- **Deployment help?** Check troubleshooting below

### Troubleshooting

#### Site doesn't load locally
```bash
# Check if Python/Node server is running on correct port
python3 -m http.server 8000
# Visit http://localhost:8000 (not https)
```

#### Language links broken
- Verify hreflang tags match actual file paths
- Check that `/en/` and `/de/` folders exist with matching files
- Test language switches work: Click language link → page reloads

#### CSS not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check that `main.css` exists in root folder
- Verify CSS links are correct: `<link rel="stylesheet" href="main.css">`

#### Character encoding issues
- Verify all files are UTF-8 encoded
- Check `<meta charset="UTF-8">` tag exists in `<head>`
- If editing in Windows, ensure editor is set to UTF-8 (not ANSI)

---

## 📄 License & Attribution

This project is made with ❤️ to support survivors and challenge systems that enable harm.

**Content License**: [Specify your chosen license – CC BY-NC-SA 4.0 or similar]
**Code License**: [Specify – MIT, GPL, etc.]

### How to Attribute
When sharing this project, please credit:
> Ljubo-Lover – Breaking Silence, Building Resilience
> https://ljubolover.si

---

## 🔐 Privacy & Data

- **No tracking** – This site collects zero analytics data
- **No cookies** – No third-party scripts or cookies
- **No forms** – No data collection mechanisms
- **Static only** – All content served locally; no backend

---

## 📝 Version History

| Date | Changes |
|------|---------|
| 26 Dec 2024 | Merged duplicate `mentalno_zdravje.json` files; added comprehensive README |
| [Earlier] | Initial content creation and translation |

---

## ❓ FAQ

**Q: Why no JavaScript?**
A: Simplicity, accessibility, security, offline capability, and ease of maintenance. JavaScript adds complexity without adding value for static content.

**Q: Why Slovenian, English, and German?**
A: These languages serve geographically close communities in Central Europe with underrepresented discourse on sexual violence against men and LGBTQ+ people.

**Q: Can we add more languages?**
A: Yes! See "Adding New Languages" in the Localization Strategy section.

**Q: How do we keep translations in sync?**
A: Manual discipline + peer review. Future automation would use tooling to enforce structural parity.

**Q: Who runs this site?**
A: [Your organization/team name]. See AGENT.MD for team information.

---

## 🙏 Acknowledgments

This project exists because survivors deserve accessible, trauma-informed information. It's built by people who understand that silence = complicity.

**To survivors reading this**: Your experience matters. Your response makes sense. You are not alone.

---

**Last Updated**: 26 December 2025  
**Maintained By**: [Project Team]  
**Repository**: https://github.com/ljuboLover/

---
