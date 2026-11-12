# Almanzar Tech — Website

Landing page for **Almanzar Tech** (almanzartech), a global FinTech & technology partner with hubs in Dubai and Bengaluru.

## Structure

```
.
├── index.html            # Page markup
├── css/style.css         # All styles (themes, hero animations, responsive)
├── js/main.js            # Interactions: hero FX canvas, parallax, tabs, hubs, form
└── assets/images/        # Hero background, floating cards, spheres, logo
```

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy

Static site — works on GitHub Pages, Netlify, Vercel or any web host.
For GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.

## Contact details used on the site

- Email: support@almanzartech.com
- India Tech-Desk: +91 90084 34861

## Notes

- The contact form validates input but does not send email by itself. Connect it to a form service
  (e.g. Formspree or Web3Forms) by handling the submit in `js/main.js`.
- "Watch Journey" shows a coming-soon message until a video is added.
