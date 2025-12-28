Fast Apply: IMPORTANT: Use \`edit_file\` over \`str_replace\` or full file writes. It works with partial code snippets—no need for full file content.

Warp Grep: warp-grep is a subagent that takes in a search string and tries to find relevant context. Best practice is to use it at the beginning of codebase explorations to fast track finding relevant files/lines. Do not use it to pin point keywords, but use it for broader semantic queries. \"Find the XYZ flow\", \"How does XYZ work\", \"Where is XYZ handled?\", \"Where is <error message> coming from?\"" >> .github/copilot-instructions.md# GitHub Copilot Instructions for Ljubo-Lover

## Project Overview
This is a static HTML website with localized content (Slovenian, English, German). It uses vanilla JavaScript to dynamically load shared components (navigation, footer) to minimize code duplication.

## Architecture & Structure
- **Root**: Contains global assets (`main.css`, `index.html`) and language directories.
- **Languages**: Content is split into `sl/` (Slovenian), `en/` (English), and `de/` (German).
- **Dynamic Components**: `assets/js/contentLoader.js` fetches JSON data from `content/` to render the navigation bar and footer.
- **Data Sources**:
  - `content/navigation.json`: Defines menu items and links.
  - `content/footer.json`: Defines footer links and content.
  - `content/*.json`: These files serve as **content guidelines/outlines** for creating new HTML pages. They define the structure and text that should be implemented in the static HTML files.

## Key Developer Workflows

### 1. Adding a New Page
1.  **Consult Content Guidelines**: Check `content/` for a corresponding JSON file to understand the required structure and text for the new page.
2.  **Create HTML Files**: Create the HTML file in each language folder (`sl/`, `en/`, `de/`).
3.  **Update Page Mapping**: You **MUST** add the new filenames to the `pageMapping` object in `assets/js/contentLoader.js`. This ensures the language switcher works correctly.
    ```javascript
    // Example in assets/js/contentLoader.js
    'newPage.html': { sl: 'novaStran.html', en: 'newPage.html', de: 'neueSeite.html' },
    ```
3.  **Update Navigation**: If the page should appear in the menu, edit `content/navigation.json`.

### 2. Editing Content
- **Page Text**: Edit the HTML files in `sl/`, `en/`, or `de/` directly.
- **Shared Elements**: To change the menu or footer, edit the corresponding JSON file in `content/`.

### 3. Styling
- Use CSS variables defined in `main.css` (e.g., `--accent`, `--bg`, `--text`).
- The design uses a dark theme with specific contrast ratios for accessibility.

## Conventions & Patterns
- **Paths**: Use relative paths for assets (e.g., `../main.css`, `../assets/js/contentLoader.js`).
- **HTML Structure**:
  - Include `<meta name="viewport" ...>` and SEO meta tags.
  - Use `<link rel="alternate" hreflang="...">` tags in the `<head>` for SEO.
  - Ensure the `<body>` includes the `<script src="../assets/js/contentLoader.js"></script>` (usually at the end or deferred).
- **Accessibility**:
  - Maintain high contrast (use `--text` on `--bg`).
  - Ensure semantic HTML (headings, landmarks).

## Existing AI Tools
Fast Apply: IMPORTANT: Use `edit_file` over `str_replace` or full file writes. It works with partial code snippets—no need for full file content.

Warp Grep: warp-grep is a subagent that takes in a search string and tries to find relevant context. Best practice is to use it at the beginning of codebase explorations to fast track finding relevant files/lines. Do not use it to pin point keywords, but use it for broader semantic queries. "Find the XYZ flow", "How does XYZ work", "Where is XYZ handled?", "Where is <error message> coming from?"
