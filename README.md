# ACCsite

Site de prezentare — portofoliu creare website-uri pentru afaceri mici locale.

## Structură

- `index.html` — pagina principală, cu hero + carusel video (cele 6 domenii)
- `despre.html` — despre ACCsite
- `portofoliu.html` — direcțiile de design pentru fiecare domeniu
- `contact.html` — formular și metode de contact
- `css/style.css` — design system (culori, tipografie, componente)
- `js/main.js` — temă, meniu interactiv, carusel video, animații la scroll
- `media/` — clipurile video generate (Leonardo) pentru cele 6 domenii

## Teme

Site-ul are două teme, comutabile din header (butonul oval de lângă CTA) și persistate în `localStorage`:

- **Noir** (implicit) — fundal negru, text alb, accent auriu discret
- **Smarald** — fundal crem/camel, text și accente verde smarald

Temele sunt definite ca variabile CSS în `css/style.css`, sub `:root`/`[data-theme="noir"]` și `[data-theme="emerald"]`.

## Rulare locală

Fiind un site static, se poate deschide direct `index.html` în browser, sau servit local:

```bash
python3 -m http.server 8000
```

apoi accesează `http://localhost:8000`.

## De completat înainte de lansare

- Înlocuiește numărul de WhatsApp placeholder (`40700000000`) cu numărul real, în toate fișierele HTML
- Înlocuiește `contact@accsite.ro` cu adresa de email reală
- Actualizează `og:url` / `canonical` cu domeniul final, dacă diferă de `accsite.ro`
