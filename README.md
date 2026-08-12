# ACCsite

Site de prezentare — portofoliu creare website-uri pentru afaceri mici locale.

## Structură

- `index.html` — pagina principală, cu hero + carusel video (cele 6 domenii)
- `despre.html` — despre ACCsite
- `portofoliu.html` — direcțiile de design pentru fiecare domeniu
- `contact.html` — formular și metode de contact
- `css/style.css` — design system (culori, tipografie, componente)
- `js/main.js` — meniu mobil, carusel video, animații la scroll
- `media/` — clipurile video generate (Leonardo) pentru cele 6 domenii

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
