## Quick start
- Install: `npm install`
- Set the contact endpoint directly in `components/Contact.tsx` (replace `https://formspree.io/f/YOUR_FORMSPREE_ID` with your Formspree/Basin URL). No env files needed.
- Dev: `npm run dev` then open the printed localhost URL.
- Build: `npm run build` produces `dist/` for static hosting.

## Contact form email delivery (no backend)
- Use a static form service (Formspree recommended).
- Steps (Formspree): sign up → create a new form → copy its endpoint → paste it into `components/Contact.tsx` → deploy. The form will email you on submit.
- After deploy, submit once in production to confirm the email arrives.

## Deploy to GitHub Pages + custom domain
1) Create a GitHub repo and push this project (include `package-lock.json` if present).
2) Add a Pages workflow: GitHub → Settings → Pages → “Build and deployment” → Source: GitHub Actions → configure “Deploy static site”. Use a Node action that runs `npm ci` and `npm run build`, then uploads `dist/`.
3) After the first successful deploy, Pages will give you a URL. If you bought a domain, point its DNS (A/AAAA or CNAME) to GitHub Pages and set the same domain under Settings → Pages → Custom domain; GitHub will create a `CNAME` record automatically.
4) Wait for DNS to propagate, then test the site and submit the contact form once to confirm email delivery.

## Notes
- The chatbot component has been removed to avoid unnecessary API/security exposure.
- No server is required; everything builds to static assets for GitHub Pages or any CDN.
