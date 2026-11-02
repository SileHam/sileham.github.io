# Hamza Zniber — Engineering Portfolio

The existing portfolio, updated for academic research applications, including the ETH Zurich Student Summer Research Fellowship 2027. No institutional affiliation or acceptance is claimed.

## Stack and repository

Buildless HTML, CSS and vanilla JavaScript. No framework, package installation, external font, backend, or compilation is required.

```text
index.html                 Profile, projects, courses, education, contact
styles.css                 Shared styles, responsive layouts, reduced motion, print
script.js                  Mobile menu, project dialogs, command console
PDP.jpg                    Existing portrait, preserved
favicon.png                Existing favicon, preserved
hamza_portfolio.html        Existing redirect to index.html, preserved
scripts/check_site.py       Dependency-free static validation
.gitignore                 Excludes local preview logs and QA artifacts
README.md                  Preview, content notes, checks, deployment
```

There is no tracked deployment workflow, custom domain file, package manifest, or framework configuration. The branch is `main`; the Git remote remains `https://github.com/SileHam/sileham.github.io.git`. The public repository reports GitHub Pages enabled. Its exact publishing settings were not changed or independently verified.

The current personal profile is [Hvma0](https://github.com/Hvma0). Hosting and the three existing project repositories remain under `SileHam`. Profile links use `Hvma0`; project links retain their actual repository owners. These accounts are not treated as interchangeable.

## Local preview

Run from this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. Stop with Ctrl+C. Opening `index.html` directly also works; HTTP better represents GitHub Pages.

## What changed

- Fourth-year Computer Engineering profile at EMSI, Casablanca, with expected graduation in 2028. Added education and current learning interests in ML, NLP, RAG, information retrieval and responsible AI.
- Featured the July 2026 OCP internship prototype, supplied stack, technical highlights and a clearly labeled conceptual HTML/CSS architecture diagram. No private source, documents, screenshots or internal data are included.
- Preserved NIGHTTRACE, Library Management System and the cybersecurity portfolio project. Corrected the library description to the PHP/Symfony catalog and authentication functionality documented in its public repository, removing the old C/borrower claim. No unavailable demos were invented.
- Organized skills without proficiency ratings. REST API design was omitted because the supplied evidence does not establish it.
- Kept six existing course completions and credential IDs; added the three owner-confirmed April 2026 courses without invented verification details. The Pearson CEH item is explicitly an individual unit, not a full professional certification.
- Preserved email, LinkedIn, portrait, favicon, redirect, project dialogs, command console and planned security roadmap. The roadmap and console use compact disclosures. Console navigation commands still jump to relevant sections.
- Charcoal surfaces, warm white text, muted green accents, serif display typography and subtle movement replace the blocking introduction, custom cursor and continuously animated canvases. Supports keyboard navigation, mobile/tablet/desktop layouts, reduced motion, printing and core content without JavaScript.
- Added canonical, description, Open Graph and Twitter metadata. Extracted CSS and JavaScript into maintainable files.

## Content provenance and pending details

- Academic and internship facts follow the supplied brief. The 264 passing tests are **reported internship results**, not portfolio tests. No accuracy scores, production deployment, business impact or advanced research expertise are claimed.
- The assistant has no public repository or download. The diagram is conceptual; source code and internal documentation are not publicly shared.
- The six original credential IDs are retained from the portfolio and were not independently authenticated. Official course links describe courses, not individual credential verification.
- The owner confirmed completion in April 2026 of IBM **Generative AI: Introduction and Applications**, Michigan **Using Python to Access Web Data**, and Google **Foundations: Data, Data, Everywhere**. Their entries say “Credential details pending.” Add real links/IDs only when supplied, without duplicating cards.
- No CV was supplied for a line-by-line comparison. The site offers a CV on request rather than a download.
- Email and LinkedIn are preserved from the original site. LinkedIn blocked automated access with HTTP 999; profile content remains unverified. Mailbox delivery was not tested.

## Checks

```powershell
python scripts/check_site.py
node --check script.js
git diff --check
```

The Python check covers HTML nesting, unique IDs, local assets, section anchors, accessibility references, external-tab attributes, nine course records, original credential IDs, profile accuracy, confidentiality labeling and the legacy redirect. There is no configured framework build, lint task or pre-existing test suite.

Verified locally on 2 November 2026:

- Static checks, JavaScript syntax and Git whitespace checks passed.
- Playwright with installed Microsoft Edge: no horizontal overflow at 320, 375, 390, 560, 768, 800, 801, 1024, 1440 and 1920 pixels.
- Browser interactions passed: mobile menu/navigation, Escape, all project dialogs, focus containment/restoration, close/backdrop, course/roadmap disclosures, console commands, safe HTML-like input, reduced motion, no-JavaScript mobile browsing and legacy redirect.
- No browser JavaScript errors, broken images or failed local requests.
- axe-core 4.10.3 reported zero automated WCAG 2 A/AA, WCAG 2.1 A/AA and best-practice violations across desktop default, desktop disclosures open, mobile menu/disclosures open and project dialog states. Gradient text colors were separately checked against the lightest background: at least 7.9:1 contrast. Remaining manual-review flags concern decorative glyphs; this is not a full accessibility certification.
- GitHub profile, three project repositories, portfolio and three official course pages returned HTTP 200. The old EPFL Graph Search URL returned 404 and was replaced with the working [Coursera course page](https://www.coursera.org/learn/programmation-orientee-objet-cpp). LinkedIn returned HTTP 999.

Local browser QA scripts, reports and screenshots are in ignored `.local/`, using an existing Playwright installation. They are not production dependencies.

## GitHub Pages deployment — only after approval

Publishing is performed only after owner approval. For subsequent updates:

1. Review the preview and pending details above.
2. With an authorized account for **SileHam/sileham.github.io**, inspect **Settings → Pages**. Preserve its existing publishing source. For root-based branch publishing, use **Deploy from a branch**, `main`, `/(root)`. Retain an existing deployment workflow if one is configured.
3. Only after explicit approval, stage the intended files, commit and push to the existing remote. Pushing the publishing branch can automatically publish the site. Example commands for an approved update:

   ```powershell
   git add index.html styles.css script.js scripts/check_site.py README.md .gitignore
   git commit -m "Update portfolio for academic research applications"
   git push origin main
   ```

4. Check the Pages deployment status. Verify <https://sileham.github.io/> and the legacy redirect at <https://sileham.github.io/hamza_portfolio.html>.

Root `index.html` and relative asset paths remain compatible with GitHub Pages. No hosting migration is needed. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
