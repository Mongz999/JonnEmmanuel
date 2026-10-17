# VYSTRALYN. — Beyond the Code.

An interactive personal developer portfolio by **Jonn Emmanuel A. Renejane**, a BS Information Technology student at the University of Cebu in Cebu City, Philippines.

Built with HTML, CSS, and vanilla JavaScript. No build step, backend, package installation, or framework is required.

## Run locally

Open `index.html` in a current browser, or open this folder in VS Code and choose **Open with Live Server**.

The site includes its portrait and project screenshots. Google Fonts supplies Space Grotesk and Inter when online; system fonts are used when unavailable. The theme preference is saved in browser localStorage where supported.

## Features

- One-page Home, About, Skills, Interests, Projects, My Journey, and closing sections.
- Responsive navigation, a separate animated ticker, scroll progress, and back-to-top control.
- Real portrait with violet orbital effects, ambient motion, and reduced-motion support.
- Scroll-triggered content reveals, interactive interests, fun facts, and a developer terminal.
- Four-chapter cosmic Journey with keyboard navigation and a shared story panel.
- A shared project showcase for Ledgix, BURP!, and Sea Urchin Hunting: real screenshots, thumbnails, categories where applicable, keyboard controls, and full-resolution zoom.
- Light and dark themes, visible focus indicators, and dismissible native dialogs.

## Project files

```text
index.html                     Single-page content and dialog markup
css/style.css                  Layout, themes, and animations
js/script.js                   Portfolio data and page interactions
js/ledgix.js                   Shared showcase data and gallery logic for all three projects
assets/icons/favicon.svg       VYSTRALYN favicon
assets/images/profile.jpg      Original portrait
assets/projects/ledgix/         Eight Ledgix screenshots
assets/projects/burp/           Two BURP! screenshots
assets/projects/sea-urchin-hunting/  Three Roblox experience screenshots
```

## Edit content

- Edit personal information, branding, and section content in `index.html`.
- Edit skills, interests, fun facts, project cards, terminal commands, and Journey chapters in `js/script.js`.
- Edit screenshots, descriptions, features, technology labels, and the official game link in `projectShowcases` inside `js/ledgix.js`.
- Replace `assets/images/profile.jpg` to update the portrait. Update image dimensions and alt text in `index.html` and adjust `object-position` in CSS if needed.
- Keep file names and relative paths case-exact. GitHub Pages is case-sensitive.

The showcases display static captures of the actual applications; they do not simulate accounting transactions or embed a playable Roblox game. Sea Urchin Hunting links to its official Roblox experience.

## GitHub Pages

Repository: [Mongz999/vystralyn](https://github.com/Mongz999/vystralyn)

After the source has been pushed:

1. Open the repository's **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. When GitHub finishes deploying, the expected address is **https://mongz999.github.io/vystralyn/**.

This README does not assert that Pages is already enabled. `index.html` belongs at the repository root. Asset paths are relative so the site can run from the `/vystralyn/` project subdirectory.

## Presentation and verification

A suggested 45-second tour: start with the portrait and energy orb, reveal a fun fact, open a project gallery, explore the Journey chapters, then try `mission` in the developer terminal. Visitors can navigate freely without forced waits.

Before presenting, check the site in your browser at desktop and mobile widths, in both themes. Try keyboard navigation, project zoom and closing, Journey controls, and reduced motion. Automated source checks do not replace visual browser testing.

Local QA notes, temporary helpers, unused concept illustrations, editor settings, and secret files are excluded by `.gitignore`. The original local folder name `violet-universe` and saved-theme key `violet-theme` are retained for compatibility; the public website identity is VYSTRALYN.
